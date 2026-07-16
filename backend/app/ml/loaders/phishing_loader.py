from pathlib import Path

import torch
import torch.nn as nn

from torchvision.models import (
    efficientnet_b0
)

DEVICE = (
    "cuda"
    if torch.cuda.is_available()
    else "cpu"
)

MODEL_PATH = Path(
    "app/ml/models/cnn_phishing.pth"
)

_cnn_model = None


def load_cnn_model():

    global _cnn_model

    if _cnn_model is not None:
        return _cnn_model

    model = efficientnet_b0(
        weights=None
    )

    in_features = (
        model.classifier[1].in_features
    )

    model.classifier = nn.Sequential(

        nn.Dropout(0.3),

        nn.Linear(
            in_features,
            256
        ),

        nn.ReLU(),

        nn.Dropout(0.2),

        nn.Linear(
            256,
            1
        )
    )

    model.load_state_dict(
        torch.load(
            MODEL_PATH,
            map_location=DEVICE
        )
    )

    model.to(DEVICE)

    model.eval()

    _cnn_model = model

    return _cnn_model