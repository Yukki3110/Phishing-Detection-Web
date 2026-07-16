import cv2
import numpy as np
from .preprocess.image_resize import resize_image
from .preprocess.normalization import normalize_image
from .preprocess.srcreenshot_cleaner import clean_screenshot
from .rule_engine.credential_harvesting import detect_credential_harvesting
from .rule_engine.urgency_manipulation import detect_urgency_manipulation
from .rule_engine.trust_abuse import detect_trust_abuse
from .rule_engine.visual_cloning import detect_visual_cloning
from .rule_engine.visual_cloning import analyze_ui_components
from .rule_engine.risk_scorer import calculate_visual_risk
from app.ml.inference.visual_predictor import predict_visual_phishing

def load_image(file_bytes):
    image_array = np.frombuffer(
        file_bytes,
        np.uint8
    )
    
    image = cv2.imdecode(
        image_array,
        cv2.IMREAD_COLOR
    )
    
    return image

def preprocess_image(image):
    image = clean_screenshot(image)
    
    image = resize_image(image)
    
    image = normalize_image(image)
    
    return image

def analyze_visual_image(contents):

    img = load_image(contents)

    processed = preprocess_image(img)

    credential_result = detect_credential_harvesting(img)
    urgency_result = detect_urgency_manipulation(img)
    trust_result = detect_trust_abuse(img)
    cloning_result = detect_visual_cloning(img)
    analyzed_ui = analyze_ui_components(img)

    cnn_result = predict_visual_phishing(img)

    risk_result = calculate_visual_risk(
        credential_result,
        urgency_result,
        trust_result,
        cloning_result,
        analyzed_ui,
        cnn_result
    )

    return {
        "shape": list(processed.shape),
        "min": float(processed.min()),
        "max": float(processed.max()),
        "credential_analysis": credential_result,
        "urgency_result": urgency_result,
        "trust_result": trust_result,
        "visual_cloning": cloning_result,
        "analyzed_ui": analyzed_ui,
        "cnn_result": cnn_result,
        "risk_result": risk_result,
    }