from pathlib import Path
import random
import torch
import numpy as np

from torchvision import datasets
from torchvision import transforms

from torch.utils.data import DataLoader
from collections import Counter

import torch.nn as nn

from torchvision.models import (
    efficientnet_b0,
    EfficientNet_B0_Weights
)

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
    classification_report
)


# ==================================================
# CONFIG
# ==================================================

DATASET_DIR = Path("C:\\Phishing-Detection-Web\\training\\training\\dataset")

BATCH_SIZE = 16

MAX_EPOCHS = 40

LEARNING_RATE = 1e-4

EARLY_STOPPING_PATIENCE = 7

DEVICE = torch.device(
    "cuda"
    if torch.cuda.is_available()
    else "cpu"
)

print(f"Device: {DEVICE}")
SEED = 42

random.seed(SEED)
np.random.seed(SEED)

torch.manual_seed(SEED)

if torch.cuda.is_available():
    torch.cuda.manual_seed(SEED)
    torch.cuda.manual_seed_all(SEED)

torch.backends.cudnn.deterministic = True
torch.backends.cudnn.benchmark = False


# ==================================================
# TRANSFORMS
# ==================================================

train_transform = transforms.Compose([

    transforms.Resize(
        (224, 224)
    ),

    transforms.RandomResizedCrop(
        224,
        scale=(0.9, 1.0)
    ),

    transforms.ColorJitter(
        brightness=0.15,
        contrast=0.15
    ),

    transforms.RandomAffine(
        degrees=2,
        translate=(0.02, 0.02)
    ),

    transforms.ToTensor(),

    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])


val_transform = transforms.Compose([

    transforms.Resize(
        (224, 224)
    ),

    transforms.ToTensor(),

    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])


# ==================================================
# DATASETS
# ==================================================

train_dataset = datasets.ImageFolder(

    DATASET_DIR / "train",

    transform=train_transform
)

val_dataset = datasets.ImageFolder(

    DATASET_DIR / "val",

    transform=val_transform
)

test_dataset = datasets.ImageFolder(

    DATASET_DIR / "test",

    transform=val_transform
)

# ==================================================
# WEIGHT
# ==================================================

train_labels = [
    label
    for _, label in train_dataset.samples
]

label_counts = Counter(
    train_labels
)

print(
    "\nLabel Counts:",
    label_counts
)

num_negative = label_counts[0]
num_positive = label_counts[1]

pos_weight = torch.tensor(
    [num_negative / num_positive],
    dtype=torch.float32
).to(DEVICE)

print(
    "Positive Weight:",
    pos_weight.item()
)


# ==================================================
# DATALOADERS
# ==================================================

train_loader = DataLoader(

    train_dataset,

    batch_size=BATCH_SIZE,

    shuffle=True,

    num_workers=0,

    pin_memory=True
)

val_loader = DataLoader(

    val_dataset,

    batch_size=BATCH_SIZE,

    shuffle=False,

    num_workers=0,

    pin_memory=True
)

test_loader = DataLoader(

    test_dataset,

    batch_size=BATCH_SIZE,

    shuffle=False,

    num_workers=0,

    pin_memory=True
)

# ==================================================
# MODEL
# ==================================================

weights = (
    EfficientNet_B0_Weights.DEFAULT
)

model = efficientnet_b0(
    weights=weights
)
for param in model.parameters():
    param.requires_grad = True

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

model = model.to(
    DEVICE
)

print(
    "\nModel Loaded."
)
print(
    f"Trainable Parameters: "
    f"{sum(p.numel() for p in model.parameters() if p.requires_grad):,}"
)

# ==================================================
# LOSS
# ==================================================

criterion = nn.BCEWithLogitsLoss(
    pos_weight=pos_weight
)

# ==================================================
# OPTIMIZER
# ==================================================

optimizer = torch.optim.AdamW(

    model.parameters(),

    lr=LEARNING_RATE,

    weight_decay=1e-4
)
scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(
    optimizer,
    mode='min',
    factor=0.5,
    patience=2
)

# ==================================================
# METRICS
# ==================================================

def binary_accuracy(
    outputs,
    labels
):

    predictions = (
        torch.sigmoid(outputs)
        > 0.55
    ).float()

    correct = (
        predictions.view(-1)
        ==
        labels.float().view(-1)
    ).sum()

    return (
        correct.item()
        /
        labels.size(0)
    )
    
# ==================================================
# TRAIN
# ==================================================

def train_one_epoch():

    model.train()

    running_loss = 0.0

    running_acc = 0.0

    for images, labels in train_loader:

        images = images.to(
            DEVICE
        )

        labels = labels.float().to(
            DEVICE
        )

        optimizer.zero_grad()

        outputs = model(
            images
        ).squeeze(1)

        loss = criterion(
            outputs,
            labels
        )

        loss.backward()

        optimizer.step()

        acc = binary_accuracy(
            outputs,
            labels
        )

        running_loss += loss.item()

        running_acc += acc

    epoch_loss = (
        running_loss
        /
        len(train_loader)
    )

    epoch_acc = (
        running_acc
        /
        len(train_loader)
    )

    return (
        epoch_loss,
        epoch_acc
    )
    
# ==================================================
# VALIDATION
# ==================================================

def validate():

    model.eval()

    running_loss = 0.0

    running_acc = 0.0

    with torch.no_grad():

        for images, labels in val_loader:

            images = images.to(
                DEVICE
            )

            labels = labels.float().to(
                DEVICE
            )

            outputs = model(
                images
            ).squeeze(1)

            loss = criterion(
                outputs,
                labels
            )

            acc = binary_accuracy(
                outputs,
                labels
            )

            running_loss += loss.item()

            running_acc += acc

    epoch_loss = (
        running_loss
        /
        len(val_loader)
    )

    epoch_acc = (
        running_acc
        /
        len(val_loader)
    )

    return (
        epoch_loss,
        epoch_acc
    )

# ==================================================
# TEST MODEL
# ==================================================

def test_model():

    model.load_state_dict(
        torch.load(
            "cnn_phishing.pth"
        )
    )

    model.eval()

    y_true = []

    y_pred = []

    with torch.no_grad():

        for images, labels in test_loader:

            images = images.to(
                DEVICE
            )

            outputs = model(
                images
            ).squeeze(1)

            predictions = (
                torch.sigmoid(outputs)
                > 0.5
            ).int()

            y_true.extend(
                labels.numpy()
            )

            y_pred.extend(
                predictions.cpu().numpy()
            )

    acc = accuracy_score(
        y_true,
        y_pred
    )

    precision = precision_score(
        y_true,
        y_pred
    )

    recall = recall_score(
        y_true,
        y_pred
    )

    f1 = f1_score(
        y_true,
        y_pred
    )

    cm = confusion_matrix(
        y_true,
        y_pred
    )

    print("\n========== TEST RESULTS ==========")

    print(
        f"Accuracy : {acc:.4f}"
    )

    print(
        f"Precision: {precision:.4f}"
    )

    print(
        f"Recall   : {recall:.4f}"
    )

    print(
        f"F1 Score : {f1:.4f}"
    )

    print("\nConfusion Matrix:")

    print(cm)

    print("\nClassification Report:")

    print(
        classification_report(
            y_true,
            y_pred,
            target_names=[
                "genuine",
                "phishing"
            ]
        )
    )

# ==================================================
# TRAINING LOOP
# ==================================================

best_val_loss = float("inf")

early_stop_counter = 0

for epoch in range(MAX_EPOCHS):

    train_loss, train_acc = train_one_epoch()

    val_loss, val_acc = validate()
    scheduler.step(val_loss)
    current_lr = optimizer.param_groups[0]['lr']

    print(
        f"\nEpoch [{epoch+1}/{MAX_EPOCHS}]"
    )

    print(
        f"Train Loss: {train_loss:.4f} | "
        f"Train Acc: {train_acc:.4f}"
    )

    print(
        f"Val Loss: {val_loss:.4f} | "
        f"Val Acc: {val_acc:.4f}"
    )
    print(
        f"Current LR: {current_lr:.6f}"
    )

    # -------------------------------
    # Save Best Model
    # -------------------------------

    if val_loss < best_val_loss:

        best_val_loss = val_loss

        early_stop_counter = 0

        torch.save(

            model.state_dict(),

            "cnn_phishing.pth"
        )

        print(
            "Best model saved."
        )

    else:

        early_stop_counter += 1

        print(
            f"No improvement "
            f"({early_stop_counter}/"
            f"{EARLY_STOPPING_PATIENCE})"
        )

    # -------------------------------
    # Early Stop
    # -------------------------------

    if (
        early_stop_counter
        >=
        EARLY_STOPPING_PATIENCE
    ):

        print(
            "\nEarly stopping triggered."
        )

        break
print(
    "\nTraining Complete."
)
test_model()