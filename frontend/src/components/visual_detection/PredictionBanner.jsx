import { useEffect, useState } from "react";

import {

    ShieldCheck,

    AlertTriangle,

    ShieldAlert

} from "lucide-react";

function PredictionBanner({

    result

}) {

    if (!result) return null;

    const [animatedScore, setAnimatedScore] = useState(0);

    useEffect(() => {

        setAnimatedScore(0);

        let start = 0;

        const end = result.risk_result.risk_score;

        if (end === 0) return;

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

    const risk = result.risk_result;

    let color = "";
    let bg = "";
    let border = "";
    let progressColor = "";
    let Icon = ShieldCheck;

    if (risk.risk_level === "LOW") {

        color = "text-green-400";
        bg = "bg-green-500/10";
        border = "border-green-500/30";
        progressColor = "bg-green-500";
        Icon = ShieldCheck;

    }

    else if (risk.risk_level === "MEDIUM") {

        color = "text-yellow-400";
        bg = "bg-yellow-500/10";
        border = "border-yellow-500/30";
        progressColor = "bg-yellow-500";
        Icon = AlertTriangle;

    }

    else {

        color = "text-red-400";
        bg = "bg-red-500/10";
        border = "border-red-500/30";
        progressColor = "bg-red-500";
        Icon = ShieldAlert;

    }

    let prediction = "";

    switch (result.cnn_result.prediction) {

        case "genuine":

            prediction = "Legitimate Screenshot";

            break;

        case "phishing":

            prediction = "Phishing Screenshot";

            break;

        default:

            prediction = result.cnn_result.prediction;

    }

    let description = "";

    if (risk.risk_level === "LOW") {

        description =
            "The uploaded screenshot shows few or no phishing indicators. Visual appearance, interface layout and detected elements appear relatively safe.";

    }

    else if (risk.risk_level === "MEDIUM") {

        description =
            "Some phishing indicators were detected from the screenshot. Carefully verify the webpage before entering any sensitive information.";

    }

    else {

        description =
            "Multiple phishing indicators were detected across visual appearance, UI structure and machine learning analysis. Avoid interacting with this website.";

    }

    return (

        <div

            className={`
                ${bg}
                ${border}
                border
                rounded-2xl
                shadow-xl
                overflow-hidden
            `}

        >

            {/* Header */}

            <div

                className="
                    px-10
                    py-8
                "

            >

                <div

                    className="
                        flex
                        justify-between
                        items-start
                        gap-6
                        mb-10
                    "

                >

                    <div>

                        <div

                            className="
                                flex
                                items-center
                                gap-3
                                mb-2
                            "

                        >

                            <Icon

                                size={28}

                                className={color}

                            />

                            <h2

                                className={`
                                    text-3xl
                                    font-bold
                                    ${color}
                                `}

                            >

                                {risk.risk_level} RISK

                            </h2>

                        </div>

                        <p

                            className="
                                text-gray-400
                            "

                        >

                            Overall phishing assessment

                        </p>

                    </div>

                    <span

                        className={`
                            ${bg}
                            ${color}
                            px-5
                            py-2
                            rounded-full
                            border
                            ${border}
                            text-sm
                            font-semibold
                            whitespace-nowrap
                        `}

                    >

                        {prediction}

                    </span>

                </div>

                {/* Score */}

                <div className="mb-8">

                    <p

                        className="
                            text-gray-400
                            mb-3
                        "

                    >

                        Overall Risk Score

                    </p>

                    <div

                        className="
                            flex
                            items-end
                            gap-2
                            mb-6
                        "

                    >

                        <span

                            className={`
                                text-5xl
                                font-bold
                                ${color}
                            `}

                        >

                            {animatedScore}

                        </span>

                        <span

                            className="
                                text-gray-500
                                text-xl
                                mb-1
                            "

                        >

                            /100

                        </span>

                    </div>

                    <div

                        className="
                            w-full
                            h-4
                            bg-[#0D1117]
                            rounded-full
                            overflow-hidden
                            shadow-inner
                        "

                    >

                        <div

                            className={`
                                h-full
                                ${progressColor}
                                rounded-full
                                transition-all
                                duration-1000
                                ease-out
                                shadow-lg
                            `}

                            style={{

                                width: `${animatedScore}%`

                            }}

                        />

                    </div>

                </div>

                {/* Description */}

                <div

                    className="
                        border-t
                        border-[#30363D]
                        pt-6
                    "

                >

                    <p

                        className="
                            text-gray-300
                            leading-8
                        "

                    >

                        {description}

                    </p>

                </div>

            </div>

        </div>

    );

}

export default PredictionBanner;