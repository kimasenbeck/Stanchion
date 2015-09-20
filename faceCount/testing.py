import cv2
import sys

cap = cv2.VideoCapture(1)

cascPath = sys.argv[1]

# Create the haar cascade
faceCascade = cv2.CascadeClassifier(cascPath)

while(True):
    # Read the image
    # image = cv2.imread(imagePath)
    ret, image = cap.read()
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Detect faces in the image
    faces = faceCascade.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(30, 30),
        flags = cv2.cv.CV_HAAR_SCALE_IMAGE
    )

    print "Found {0} faces!".format(len(faces))

    faceSubSections = []
    scale = .25

    # Draw a rectangle around the faces
    for (x, y, w, h) in faces:
        x1 = max(0, (x - w * scale))
        x2 = max(0, (x + w * (1 + scale)))
        y1 = max(0, (y - h * scale))
        y2 = max(0, (y + h * (1 + scale)))

        print x1, x2, y1, y2
        faceSubSections.append(image[y1:y2, x1:x2])

        cv2.rectangle(image, (x, y), (x+w, y+h), (0, 255, 0), 2)

    cv2.imshow("Faces found", image)
    if len(faceSubSections):
        for i, img in enumerate(faceSubSections):
            cv2.imshow("Face %d" % i, img)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()

# import numpy as np
# import cv2
# import sys

# cap = cv2.VideoCapture(1)
# face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

# while(True):
#     # Capture frame-by-frame
#     ret, frame = cap.read()
#     cv2.imwrite("image1.jpg", frame)

#     # Our operations on the frame come here
#     gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#     faces = face_cascade.detectMultiScale(gray)
#     # faces = face_cascade.detectMultiScale(
#     #     gray,
#     #     scaleFactor=1,
#     #     minNeighbors=3,
#     #     minSize=(30, 30),
#     #     flags = cv2.cv.CV_HAAR_SCALE_IMAGE
#     # )

#     print len(faces)
#     for (x, y, w, h) in faces:
#         cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)
#         roi_gray = gray[y:y+h, x:x+w]
#         roi_color = frame[y:y+h, x:x+w]

#     # Display the resulting frame
#     cv2.imshow('frame',gray)
#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break

# # When everything done, release the capture
# cap.release()
# cv2.destroyAllWindows()
