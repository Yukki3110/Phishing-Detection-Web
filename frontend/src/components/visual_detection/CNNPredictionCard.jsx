import {

    BrainCircuit,

    BadgeCheck,

    ShieldAlert,

    ShieldCheck,

    Activity

} from "lucide-react";

function CNNPredictionCard({

    result

}) {

    if (!result) return null;

    const cnn = result.cnn_result;

    const confidence = (

        cnn.confidence * 100

    ).toFixed(2);

    let predictionColor = "";
    let predictionBg = "";
    let PredictionIcon = ShieldCheck;

    switch (cnn.prediction) {

        case "phishing":

            predictionColor = "text-red-400";
            predictionBg = "bg-red-500/10";
            PredictionIcon = ShieldAlert;

            break;

        case "genuine":

            predictionColor = "text-green-400";
            predictionBg = "bg-green-500/10";
            PredictionIcon = ShieldCheck;

            break;

        default:

            predictionColor = "text-yellow-400";
            predictionBg = "bg-yellow-500/10";
            PredictionIcon = BadgeCheck;

    }

    let status = "";
    let statusColor = "";
    let StatusIcon = BadgeCheck;

    if (cnn.confidence >= 0.80) {

        status = "High Confidence";
        statusColor = "text-green-400";
        StatusIcon = ShieldCheck;

    }

    else if (cnn.confidence >= 0.50) {

        status = "Medium Confidence";
        statusColor = "text-yellow-400";
        StatusIcon = BadgeCheck;

    }

    else {

        status = "Low Confidence";
        statusColor = "text-red-400";
        StatusIcon = ShieldAlert;

    }

    return (

        <div

            className="
                bg-[#161B22]
                border
                border-[#30363D]
                rounded-2xl
                p-8
                shadow-lg
                h-full
            "

        >

            {/* Header */}

            <div

                className="
                    flex
                    items-center
                    gap-3
                    mb-8
                "

            >

                <BrainCircuit

                    size={22}

                    className="text-violet-400"

                />

                <h2

                    className="
                        text-xl
                        font-semibold
                        text-white
                    "

                >

                    CNN Prediction

                </h2>

            </div>

            <FeatureRow

                icon={

                    <PredictionIcon

                        size={18}

                        className={predictionColor}

                    />

                }

                title="Prediction"

                last={false}

            >

                <span

                    className={`
                        inline-flex
                        items-center
                        px-3
                        py-1
                        rounded-full
                        font-semibold
                        ${predictionBg}
                        ${predictionColor}
                    `}

                >

                    {cnn.prediction.toUpperCase()}

                </span>

            </FeatureRow>

            <FeatureRow

                icon={

                    <Activity

                        size={18}

                        className="text-cyan-400"

                    />

                }

                title="Confidence"

                last={false}

            >

                <div className="w-40">

                    <div

                        className="
                            flex
                            justify-between
                            text-sm
                            mb-2
                        "

                    >

                        <span className="text-white">

                            {confidence}%

                        </span>

                    </div>

                    <div

                        className="
                            w-full
                            h-2
                            rounded-full
                            bg-[#0D1117]
                            overflow-hidden
                        "

                    >

                        <div

                            className="
                                h-full
                                bg-cyan-400
                                rounded-full
                                transition-all
                                duration-700
                            "

                            style={{

                                width: `${confidence}%`

                            }}

                        />

                    </div>

                </div>

            </FeatureRow>

            <FeatureRow

                icon={

                    <StatusIcon

                        size={18}

                        className={statusColor}

                    />

                }

                title="Status"

                last

            >

                <span

                    className={`
                        font-semibold
                        ${statusColor}
                    `}

                >

                    {status}

                </span>

            </FeatureRow>

        </div>

    );

}

function FeatureRow({

    icon,

    title,

    children,

    last = false

}) {

    return (

        <div

            className={`
                flex
                justify-between
                items-center
                py-4
                ${
                    !last
                        ? "border-b border-[#30363D]"
                        : ""
                }
            `}

        >

            <div

                className="
                    flex
                    items-center
                    gap-3
                "

            >

                {icon}

                <span className="text-gray-400">

                    {title}

                </span>

            </div>

            {children}

        </div>

    );

}

export default CNNPredictionCard;