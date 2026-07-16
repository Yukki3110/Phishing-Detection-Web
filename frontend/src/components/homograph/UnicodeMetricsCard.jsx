import {

    Binary,
    Languages,
    Layers3,
    Shuffle,
    ShieldAlert

} from "lucide-react";

function UnicodeMetricsCard({

    result

}) {

    if (!result) return null;

    const scripts = result.scripts || [];

    const primaryScript =

        scripts.length > 0

            ? scripts[0]

            : "Unknown";

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

                <Binary
                    size={22}
                    className="text-cyan-400"
                />

                <h2
                    className="
                        text-xl
                        font-semibold
                        text-white
                    "
                >

                    Unicode Metrics

                </h2>

            </div>

            <Metric

                icon={
                    <Languages
                        size={18}
                        className="text-green-400"
                    />
                }

                title="Primary Script"

                value={primaryScript}

            />

            <Metric

                icon={
                    <Layers3
                        size={18}
                        className="text-blue-400"
                    />
                }

                title="Scripts Detected"

                value={scripts.length}

            />

            <Metric

                icon={
                    <Shuffle
                        size={18}
                        className="text-yellow-400"
                    />
                }

                title="Mixed Scripts"

                value={
                    result.mixed_scripts
                        ? "Yes"
                        : "No"
                }

                valueClass={
                    result.mixed_scripts
                        ? "text-yellow-400"
                        : "text-green-400"
                }

            />

            <Metric

                icon={
                    <Binary
                        size={18}
                        className="text-red-400"
                    />
                }

                title="Confusable Characters"

                value={result.confusable_count}

                valueClass={
                    result.confusable_count > 0
                        ? "text-red-400"
                        : "text-green-400"
                }

            />

            <Metric

                icon={
                    <ShieldAlert
                        size={18}
                        className="text-purple-400"
                    />
                }

                title="Punycode"

                value={
                    result.is_punycode
                        ? "Yes"
                        : "No"
                }

                valueClass={
                    result.is_punycode
                        ? "text-yellow-400"
                        : "text-green-400"
                }

                last

            />

        </div>

    );

}

function Metric({

    icon,

    title,

    value,

    valueClass = "text-white",

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

                <span
                    className="
                        text-gray-400
                    "
                >

                    {title}

                </span>

            </div>

            <span
                className={`
                    font-semibold
                    ${valueClass}
                `}
            >

                {value}

            </span>

        </div>

    );

}

export default UnicodeMetricsCard;