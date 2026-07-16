import cv2
def resize_image(image, size=(224,244)):
    return cv2.resize(image, size)