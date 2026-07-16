from pathlib import Path
import joblib

MODEL_PATH = (
    Path(__file__).parent.parent
    / "models"
    / "random_forest.pkl"
)

rf_model = None

try:

    rf_model = joblib.load(
        MODEL_PATH
    )

    print(
        "[INFO] Random Forest model loaded successfully."
    )

except Exception as e:

    print(
        f"[ERROR] Failed to load Random Forest model: {e}"
    )