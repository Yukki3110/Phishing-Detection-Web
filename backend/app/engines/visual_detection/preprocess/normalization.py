import numpy as np

def normalize_image(image):
    image = image.astype(np.float32)
    
    image = image / 255.0
    
    return image