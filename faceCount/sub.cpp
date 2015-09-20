#include "opencv2/highgui/highgui.hpp"
#include "opencv2/opencv.hpp"
#include "opencv2/core/core.hpp"
#include "opencv2/imgproc/imgproc.hpp"
#include <math.h>
#include <iostream>

using namespace cv;

bool compare(Vec3b* one, Vec3b* two);

bool make_black(Mat* one, Mat* two) {
  Vec3b one_data, two_data;
  Vec3b black;
  black[0] = 0;
  black[1] = 0;
  black[2] = 0;
  for (int i = 0; i < one->rows; i++) {
    for (int j = 0; j < one->cols; j++) {
      one_data = one->at<Vec3b>(i, j);
      two_data = two->at<Vec3b>(i, j);
      if (compare(&one_data, &two_data)) {
        two->at<Vec3b>(i, j) = black; 
      }
    }
  }
  return true;
}

void clean_black(Mat* dirty, Mat* clean, int grid_size, int maxVal) {
  std::cout << "did I get called" << std::endl;
  int distance = 5; //that's the boundary we check, everything should be blackish
  /* int maxVal = 4; */
  double maxAllowed = (2 * distance) * (2 * distance) * (3 * maxVal);
  
  Vec3b black;
  black[0] = 0;
  black[1] = 0;
  black[2] = 0;
  
  /* int r = 0, g = 0, b = 0; */
  Vec3b pt;

  int radius = grid_size / 2;

  std::cout << ((dirty->rows - radius) / grid_size) << std::endl;
  std::cout << ((dirty->cols - radius) / grid_size) << std::endl;
  for (int i = 0; i < ((dirty->rows) / grid_size); i++) {
    for (int j = 0; j < ((dirty->cols) / grid_size); j++) {
      int total = 0;
      //first we go through the grid to check if any are greater than thresh
      for (int k = -1 * radius; k < radius; k++) {
        for (int l = -1 * radius; l < radius; l++) {
          pt = dirty->at<Vec3b>(i * grid_size + k + radius, j * grid_size + l + radius);
          total = total + pt[0] + pt[1] + pt[2];
        }
      }

      double ratio = (double)total / maxAllowed;
      std::cout << ratio << std::endl;
      if (ratio <= 1) {
        for (int k = -1 * radius; k < radius; k++) {
          for (int l = -1 * radius; l < radius; l++) {
            clean->at<Vec3b>(i * grid_size + k + radius, j * grid_size + l + radius) = black;
          }
        }
      }
    }
  }

  return;
}

bool compare(Vec3b* one, Vec3b* two) {
  int threshold = 50;
  if ((abs((*one)[0] - (*two)[0]) > threshold) ||
      (abs((*one)[1] - (*two)[1]) > threshold) ||
      (abs((*one)[2] - (*two)[2]) > threshold)) {
      return false;
  }
  return true;
}

int main()
{
    Mat background = imread("captures/clean4.jpg");
    Mat bg_blurred;
    GaussianBlur( background, bg_blurred, Size(5, 5), 0, 0);

    Mat element = getStructuringElement( 0, Size(1, 1), Point( 0, 0));
    Mat frame;

    VideoCapture cap(1);
    while( cap.isOpened() )
    {

      if ( ! cap.read(frame) )
        break;
      
      Mat frame_blurred;
      GaussianBlur( frame, frame_blurred, Size(5, 5), 0, 0);
      erode( frame_blurred, frame_blurred, element);
      dilate( frame_blurred, frame_blurred, element);
      
      make_black(&bg_blurred, &frame_blurred);
      Mat frame_blurred_clean = frame.clone();

      // tune this, maybe?
      clean_black( &frame_blurred, &frame_blurred_clean, 80, 20);
      clean_black( &frame_blurred, &frame_blurred_clean, 40, 10);
      clean_black( &frame_blurred, &frame_blurred_clean, 20, 10);
      /* clean_black( &frame_blurred, &frame_blurred_clean, 10, 20); */

      cvtColor( frame_blurred, frame_blurred, CV_BGR2GRAY);
      threshold( frame_blurred, frame_blurred, 128, 255, CV_THRESH_BINARY);

      std::vector<std::vector<Point> > contours;
      Mat contourOutput = frame_blurred.clone();
      findContours( contourOutput, contours, CV_RETR_LIST, CV_CHAIN_APPROX_NONE);

      //Draw the contours
      cv::Mat contourImage(frame_blurred.size(), CV_8UC3, cv::Scalar(0,0,0));
      cv::Scalar colors[3];
      colors[0] = cv::Scalar(255, 0, 0);
      colors[1] = cv::Scalar(0, 255, 0);
      colors[2] = cv::Scalar(0, 0, 255);
      for (size_t idx = 0; idx < contours.size(); idx++) {
        cv::drawContours(contourImage, contours, idx, colors[idx % 3]);
      }

      /* imshow("lalala", frame_blurred); */
      /* imshow("lala", contourImage); */
      imshow("plz", frame_blurred_clean);
      int k = waitKey(1);
      if ( k > 0 ) {
        break;
      }
    }
    return 0;
}
