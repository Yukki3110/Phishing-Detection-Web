from pathlib import Path

import joblib
import pandas as pd

from sklearn.ensemble import RandomForestClassifier

from sklearn.model_selection import (
    train_test_split,
    cross_val_score
)

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
    classification_report
)

# ==========================================
# Paths
# ==========================================

DATASET_PATH = Path(
    "C:\\Phishing-Detection-Web\\training\\dataset\\PhiUSIIL_Phishing_URL_Dataset.csv"
)

MODEL_OUTPUT_PATH = Path(
    "random_forest.pkl"
)

FEATURE_OUTPUT_PATH = Path(
    "rf_feature_names.pkl"
)

# ==========================================
# Load Dataset
# ==========================================

print("Loading dataset...")

df = pd.read_csv(DATASET_PATH)

print(
    f"Dataset shape: {df.shape}"
)

# ==========================================
# Features supported by system
# ==========================================

FEATURE_COLUMNS = [

    # Lexical Features

    "URLLength",
    "DomainLength",
    "IsDomainIP",
    "NoOfSubDomain",

    "NoOfLettersInURL",
    "LetterRatioInURL",

    "NoOfDegitsInURL",
    "DegitRatioInURL",

    "NoOfEqualsInURL",
    "NoOfQMarkInURL",
    "NoOfAmpersandInURL",

    "NoOfOtherSpecialCharsInURL",
    "SpacialCharRatioInURL",

    "IsHTTPS",

    # Content Features

    "HasTitle",
    "HasFavicon",

    "NoOfURLRedirect",

    "HasDescription",

    "NoOfiFrame",

    "HasSubmitButton",
    "HasHiddenFields",
    "HasPasswordField",

]

# ==========================================
# Verify columns exist
# ==========================================

missing_columns = [

    col

    for col in FEATURE_COLUMNS

    if col not in df.columns
]

if missing_columns:

    print("\nMissing columns in dataset:")

    for col in missing_columns:
        print(col)

    raise Exception(
        "Dataset does not contain all required features."
    )

# ==========================================
# Prepare dataset
# ==========================================

X = df[FEATURE_COLUMNS]

y = df["label"]

print(
    f"\nFeatures used: {X.shape[1]}"
)

print("\nSelected Features:\n")

for feature in FEATURE_COLUMNS:
    print(feature)

# ==========================================
# Missing values
# ==========================================

print("\nMissing Values:\n")

print(
    X.isnull().sum()
)

# Fill missing values

X = X.fillna(0)

# ==========================================
# Train / Test Split
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(

    X,
    y,

    test_size=0.2,

    random_state=42,

    stratify=y
)

print(
    f"\nTrain samples: {len(X_train)}"
)

print(
    f"Test samples: {len(X_test)}"
)

# ==========================================
# Random Forest
# ==========================================

print("\nTraining Random Forest...")

rf_model = RandomForestClassifier(

    n_estimators=500,

    max_depth=25,

    min_samples_split=5,

    min_samples_leaf=2,

    random_state=42,

    n_jobs=-1
)

# ==========================================
# Cross Validation
# ==========================================

print("\nRunning Cross Validation...")

cv_scores = cross_val_score(

    rf_model,

    X,
    y,

    cv=5,

    scoring="f1",

    n_jobs=-1
)

print("\nCross Validation F1 Scores:")

print(cv_scores)

print(
    f"Mean F1 Score: {cv_scores.mean():.4f}"
)

# ==========================================
# Training
# ==========================================

rf_model.fit(
    X_train,
    y_train
)
train_pred = rf_model.predict(X_train)

print("\nTraining completed.")

# ==========================================
# Evaluation
# ==========================================

print("\nEvaluating...")

y_pred = rf_model.predict(X_test)

print("\n======================")
print("Evaluation Metrics")
print("======================")

print(
    f"Accuracy : {accuracy_score(y_test, y_pred):.4f}"
)

print(
    f"Precision: {precision_score(y_test, y_pred):.4f}"
)

print(
    f"Recall   : {recall_score(y_test, y_pred):.4f}"
)

print(
    f"F1 Score : {f1_score(y_test, y_pred):.4f}"
)

print("\nClassification Report:\n")

print(
    classification_report(
        y_test,
        y_pred
    )
)

print("\nConfusion Matrix:\n")

print(
    confusion_matrix(
        y_test,
        y_pred
    )
)

# ==========================================
# Feature Importance
# ==========================================

importance_df = pd.DataFrame({

    "Feature": X.columns,

    "Importance":
        rf_model.feature_importances_
})

importance_df = importance_df.sort_values(

    by="Importance",

    ascending=False
)

print("\nTop Features:\n")

print(
    importance_df
)

# ==========================================
# Save model
# ==========================================

joblib.dump(

    rf_model,

    MODEL_OUTPUT_PATH
)

joblib.dump(

    FEATURE_COLUMNS,

    FEATURE_OUTPUT_PATH
)

print(
    f"\nModel saved to: {MODEL_OUTPUT_PATH}"
)

print(
    f"Feature names saved to: {FEATURE_OUTPUT_PATH}"
)