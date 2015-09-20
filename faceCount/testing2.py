import cv2
import numpy as np

background = cv2.imread("cleanslate.jpg")
height = len(background)
width = len(background[0])

cap = cv2.VideoCapture(1)

def compare(first, second, threshold = 10):
    for i in xrange(min(len(first), len(first))):
        if abs(first[i] - second[i]) > threshold:
            return False
    return True

while (True):
    ret, image = cap.read()
    # just do blind image comparison
    for i in xrange(height):
        for j in xrange(width):
            if compare(background[i][j], image[i][j]):
                image[i][j] = (0, 0, 0)

    cv2.imshow("work?", image)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
