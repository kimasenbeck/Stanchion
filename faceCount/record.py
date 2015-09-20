import cv2
import argparse

parser = argparse.ArgumentParser(description="Record some number of frames")
parser.add_argument("-o", type=str, default = "output", help = "Output file name")
parser.add_argument("-l", type=int, default = 1, help = "Number of images to capture")

args = parser.parse_args()
cap = cv2.VideoCapture(1)

ret, image = cap.read()
cv2.imwrite("testoutput.jpg", image)

print vars(args)

for i in xrange(args.l):
    ret, image = cap.read()
    if i:
        cv2.imwrite("captures/%s%i.jpg" % (args.o, i), image)
    else:
        cv2.imwrite("captures/%s.jpg" % (args.o), image)

cap.release()
