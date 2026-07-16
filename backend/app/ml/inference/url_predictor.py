import pandas as pd

from app.ml.loaders.url_loader import (
    rf_model
)


def predict_url_phishing(
    features: dict
):

    try:

        print("\n===== MODEL FEATURES =====")

        model_features = list(
            rf_model.feature_names_in_
        )

        # =====================================
        # Debug
        # =====================================

        for feature_name in model_features:

            print(
                feature_name,
                "=>",
                features.get(
                    feature_name,
                    "MISSING"
                )
            )

        # =====================================
        # Create feature dictionary
        # =====================================

        input_features = {}

        for feature_name in model_features:

            input_features[feature_name] = features.get(
                feature_name,
                0
            )

        # =====================================
        # Convert to DataFrame
        # (important to avoid sklearn warning)
        # =====================================

        feature_df = pd.DataFrame(
            [input_features]
        )

        # đảm bảo đúng thứ tự feature

        feature_df = feature_df[
            model_features
        ]

        # =====================================
        # Predict
        # =====================================

        probability = rf_model.predict_proba(
            feature_df
        )[0][1]

        print(
            f"RF Probability: {probability}"
        )

        prediction = (

            "phishing"

            if probability >= 0.5

            else "legitimate"
        )

        confidence = round(
            probability,
            4
        )

        # convert probability -> risk score

        score = int(
            probability * 100
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

        print(
            f"Predictor Error: {e}"
        )

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