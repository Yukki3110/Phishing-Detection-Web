import cv2
import torch
import numpy as np

from PIL import Image

from torchvision import transforms

from app.ml.loaders.phishing_loader import (
    load_cnn_model
)

DEVICE = (
    "cuda"
    if torch.cuda.is_available()
    else "cpu"
)

transform = transforms.Compose([

    transforms.Resize(
        (224, 224)
    ),

    transforms.ToTensor(),

    transforms.Normalize(

        mean=[0.485, 0.456, 0.406],

        std=[0.229, 0.224, 0.225]
    )
])

model = load_cnn_model()

def predict_visual_phishing(
    image: np.ndarray
):

    try:

        # OpenCV BGR -> RGB

        image_rgb = cv2.cvtColor(

            image,

            cv2.COLOR_BGR2RGB
        )

        image_pil = Image.fromarray(
            image_rgb
        )

        image_tensor = transform(
            image_pil
        )

        image_tensor = image_tensor.unsqueeze(
            0
        )

        image_tensor = image_tensor.to(
            DEVICE
        )

        with torch.no_grad():

            output = model(
                image_tensor
            )

            probability = torch.sigmoid(
                output
            ).item()
            
            print(f"CNN Probability: {probability}")

        prediction = (

            "phishing"

            if probability >= 0.70

            else "genuine"
        )

        confidence = round(
            probability,
            4
        )

        score = int(
            probability * 50
        )

        return {

            "prediction":
                prediction,

            "confidence":
                confidence,

            "score":
                score
        }

    except Exception as e:

        return {

            "prediction":
                "unknown",

            "confidence":
                0,

            "score":
                0,

            "error":
                str(e)
        }
