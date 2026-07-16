import { useEffect, useState } from "react";

import {

    ShieldCheck,

    AlertTriangle,

    ShieldAlert

} from "lucide-react";

function RiskBanner({

    result

}) {

    const [animatedScore, setAnimatedScore] = useState(0);

    if (!result) return null;

    useEffect(() => {

        setAnimatedScore(0);

        let start = 0;

        const end = result.risk_score;

        if (end === 0) {

            return;

        }

        const duration = 1000;

        const increment = Math.max(1, Math.ceil(end / 60));

        const stepTime = duration / (end / increment);

        const timer = setInterval(() => {

            start += increment;

            if (start >= end) {

                start = end;

                clearInterval(timer);

            }

            setAnimatedScore(start);

        }, stepTime);

        return () => clearInterval(timer);

    }, [result]);

    let color = "";
    let bg = "";
    let border = "";
    let Icon = ShieldCheck;

    if (result.risk_level === "LOW") {

        color = "text-green-400";
        bg = "bg-green-500/10";
        border = "border-green-500/30";
        Icon = ShieldCheck;

    }

    else if (result.risk_level === "MEDIUM") {

        color = "text-yellow-400";
        bg = "bg-yellow-500/10";
        border = "border-yellow-500/30";
        Icon = AlertTriangle;

    }

    else {

        color = "text-red-400";
        bg = "bg-red-500/10";
        border = "border-red-500/30";
        Icon = ShieldAlert;

    }

    // =======================================
    // Prediction
    // =======================================

    let prediction = "";

    switch (result.prediction) {

        case "legitimate":

            prediction = "Legitimate Website";

            break;

        case "suspicious":

            prediction = "Suspicious Website";

            break;

        case "phishing":

            prediction = "Phishing Website";

            break;

        default:

            prediction = result.prediction;

    }

    // =======================================
    // Description
    // =======================================

    let description = "";

    if (result.risk_level === "LOW") {

        description =
            "URL appears safe based on lexical analysis, webpage content inspection, machine learning prediction and domain intelligence.";

    }

    else if (result.risk_level === "MEDIUM") {

        description =
            "Some phishing indicators were detected. Exercise caution before interacting with this website.";

    }

    else {

        description =
            "Multiple phishing indicators were detected. Avoid entering credentials or sensitive information on this website.";

    }

    return (

        <div

            className={`
                ${bg}
                ${border}
                border
                rounded-2xl
                p-8
                shadow-lg
            `}

        >

            {/* Header */}

            <div

                className="
                    flex
                    justify-between
                    items-center
                    mb-8
                "

            >

                <div

                    className="
                        flex
                        items-center
                        gap-3
                    "

                >

                    <Icon

                        size={26}

                        className={color}

                    />

                    <h2

                        className={`
                            text-2xl
                            font-bold
                            ${color}
                        `}

                    >

                        {result.risk_level} RISK

                    </h2>

                </div>

                <span

                    className={`
                        px-4
                        py-2
                        rounded-lg
                        font-semibold
                        ${bg}
                        ${color}
                    `}

                >

                    {prediction}

                </span>

            </div>

            {/* Score */}

            <div className="mb-4">

                <div

                    className="
                        flex
                        justify-between
                        mb-2
                    "

                >

                    <span className="text-gray-400">

                        Overall Risk Score

                    </span>

                    <span

                        className={`
                            font-bold
                            ${color}
                        `}

                    >

                        {animatedScore} / 100

                    </span>

                </div>

                <div

                    className="
                        w-full
                        h-3
                        rounded-full
                        bg-[#0D1117]
                        overflow-hidden
                    "

                >

                    <div

                        className={`
                            h-full
                            rounded-full
                            transition-all
                            duration-1000
                            ease-out
                            ${
                                result.risk_level === "LOW"

                                    ? "bg-green-500"

                                    : result.risk_level === "MEDIUM"

                                    ? "bg-yellow-500"

                                    : "bg-red-500"
                            }
                        `}

                        style={{

                            width: `${animatedScore}%`

                        }}

                    />

                </div>

            </div>

            {/* Description */}

            <p

                className="
                    text-gray-300
                    leading-relaxed
                    mt-6
                "

            >

                {description}

            </p>

        </div>

    );

}

export default RiskBanner;