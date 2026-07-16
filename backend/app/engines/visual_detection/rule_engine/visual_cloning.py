from app.engines.visual_detection.ocr_loader import get_ocr_reader
import numpy as np
import cv2

reader = get_ocr_reader()

#LAYOUT
#Mọi thứ nằm giữa màn hình
def detect_centralized_layout(results, width, height):

    if not results:
        return False

    center_x = width / 2
    center_y = height / 2

    hits = 0

    for bbox, text, conf in results:

        x = np.mean([p[0] for p in bbox])
        y = np.mean([p[1] for p in bbox])

        if (
            abs(x - center_x) < width * 0.3
            and
            abs(y - center_y) < height * 0.3
        ):
            hits += 1

    return bool(
        hits >= max(2, len(results) * 0.5)
    )
#Text dồn vào 1 box
def detect_text_cluster(results):

    if len(results) < 3:
        return False

    centers = []

    for bbox, text, conf in results:

        x = np.mean([p[0] for p in bbox])
        y = np.mean([p[1] for p in bbox])

        centers.append([x, y])

    centers = np.array(centers)

    spread_x = centers[:, 0].max() - centers[:, 0].min()
    spread_y = centers[:, 1].max() - centers[:, 1].min()

    return bool(
    spread_x < 400
    and
    spread_y < 400
)
#Một vùng UI chiếm đa số nội dung
def detect_single_focus_region(results):

    if len(results) < 3:
        return False

    areas = []

    for bbox, text, conf in results:

        xs = [p[0] for p in bbox]
        ys = [p[1] for p in bbox]

        area = (
            (max(xs) - min(xs))
            *
            (max(ys) - min(ys))
        )

        areas.append(area)

    dominant = max(areas)

    total = sum(areas)

    if total == 0:
        return False

    ratio = dominant / total

    return bool(ratio > 0.35)
#Ít thành phần,Ít text,Ít menu
def detect_sparse_structure(results):

    return bool(
        len(results) < 20
    )

def detect_vertical_form_pattern(results):

    if len(results) < 3:
        return False

    ys = []

    for bbox, text, conf in results:

        y = np.mean(
            [p[1] for p in bbox]
        )

        ys.append(y)

    ys = sorted(ys)

    gaps = []

    for i in range(len(ys) - 1):

        gaps.append(
            ys[i + 1] - ys[i]
        )

    if not gaps:
        return False

    avg_gap = sum(gaps) / len(gaps)

    return bool(avg_gap < 100)

def detect_visual_cloning(image):

    results = reader.readtext(image)

    h, w = image.shape[:2]

    indicators = []

    score = 0

    centralized = detect_centralized_layout(
        results,
        w,
        h
    )

    if centralized:

        indicators.append(
            "centralized_layout"
        )

        score += 3

    clustered = detect_text_cluster(
        results
    )

    if clustered:

        indicators.append(
            "text_cluster"
        )

        score += 3

    focus_region = detect_single_focus_region(
        results
    )

    if focus_region:

        indicators.append(
            "single_focus_region"
        )

        score += 3

    sparse = detect_sparse_structure(
        results
    )

    if sparse:

        indicators.append(
            "sparse_page"
        )

        score += 3

    vertical_form = (
        detect_vertical_form_pattern(
            results
        )
    )

    if vertical_form:

        indicators.append(
            "vertical_form_pattern"
        )

        score += 3

    return {

        "centralized_layout":
            centralized,

        "text_cluster":
            clustered,

        "single_focus_region":
            focus_region,

        "sparse_page":
            sparse,

        "vertical_form_pattern":
            vertical_form,

        "indicators":
            indicators,

        "score":
            min(score, 100)
    }

#UI COMPONENT   
def input_detector(gray):
    edges = cv2.Canny(gray, 50, 150)

    contours, _ = cv2.findContours(
        edges,
        cv2.RETR_EXTERNAL,
        cv2.CHAIN_APPROX_SIMPLE
    )

    count = 0

    for cnt in contours:
        x, y, w, h = cv2.boundingRect(cnt)

        aspect_ratio = w / (h + 1)

        if (
            w > 80 and
            h > 20 and
            aspect_ratio > 3
        ):
            count += 1

    return {
        "input_fields": count,
        "suspicious": count >= 2,
        "score": min(count * 3, 9)
    }
    
def button_detector(gray):
    _, thresh = cv2.threshold(
        gray,
        180,
        255,
        cv2.THRESH_BINARY_INV
    )

    contours, _ = cv2.findContours(
        thresh,
        cv2.RETR_EXTERNAL,
        cv2.CHAIN_APPROX_SIMPLE
    )

    count = 0

    for cnt in contours:
        area = cv2.contourArea(cnt)

        if 1000 < area < 20000:
            x, y, w, h = cv2.boundingRect(cnt)

            ratio = w / (h + 1)

            if 2 < ratio < 8:
                count += 1

    return {
        "buttons": count,
        "score": min(count * 2, 6)
    }
    
def navbar_detector(image):
    h, w = image.shape[:2]

    top_region = image[:int(h * 0.12), :]

    gray = cv2.cvtColor(top_region, cv2.COLOR_BGR2GRAY)

    edges = cv2.Canny(gray, 50, 150)

    density = np.count_nonzero(edges) / edges.size

    has_navbar = density > 0.05

    return {
        "has_navbar": bool(has_navbar),
        "score": 0 if has_navbar else 3
    }
    
def modal_detector(image):
    h, w = image.shape[:2]

    center = image[
        int(h * 0.25):int(h * 0.75),
        int(w * 0.25):int(w * 0.75)
    ]

    gray = cv2.cvtColor(center, cv2.COLOR_BGR2GRAY)

    variance = np.var(gray)

    is_modal = variance < 3000

    return {
        "modal_like": bool(is_modal),
        "score": 3 if is_modal else 0
    }
    
def footer_detector(image):

    h, w = image.shape[:2]

    footer = image[int(h * 0.85):, :]

    gray = cv2.cvtColor(footer, cv2.COLOR_BGR2GRAY)

    edges = cv2.Canny(gray, 50, 150)

    density = np.count_nonzero(edges) / edges.size

    has_footer = density > 0.03

    return {
        "has_footer": bool(has_footer),
        "score": 0 if has_footer else 3
    }
    

def analyze_ui_components(image):

    gray = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2GRAY
    )

    input_result = input_detector(gray)

    button_result = button_detector(gray)

    navbar_result = navbar_detector(image)

    modal_result = modal_detector(image)

    footer_result = footer_detector(image)

    ui_score = (
        input_result["score"]
        + button_result["score"]
        + navbar_result["score"]
        + modal_result["score"]
        + footer_result["score"]
    )

    return {

        "input_analysis": input_result,

        "button_analysis": button_result,

        "navbar_analysis": navbar_result,

        "modal_analysis": modal_result,

        "footer_analysis": footer_result,

        "score": min(ui_score, 100)
    }