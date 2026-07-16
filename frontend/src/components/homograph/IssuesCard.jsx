import {

    ShieldAlert,
    ShieldCheck,
    AlertTriangle

} from "lucide-react";

function IssuesCard({

    result

}) {

    if (!result) return null;

    const issues = [];

    // ==========================================
    // Mixed Scripts
    // ==========================================

    if (result.mixed_scripts) {

        issues.push({

            type: "warning",

            title: "Mixed Scripts",

            description:
                "Multiple writing systems were detected."

        });

    }

    // ==========================================
    // Punycode
    // ==========================================

    if (result.is_punycode) {

        issues.push({

            type: "warning",

            title: "Punycode Encoding",

            description:
                "This domain uses Internationalized Domain Name (IDN) encoding."

        });

    }

    // ==========================================
    // Normalization
    // ==========================================

    if (

        result.original_domain !==

        result.normalized_domain

    ) {

        issues.push({

            type: "warning",

            title: "Normalization Changed",

            description:
                "The normalized domain differs from the original domain."

        });

    }

    // ==========================================
    // Confusable
    // ==========================================

    if (result.confusable_count > 0) {

        issues.push({

            type: "warning",

            title: "Confusable Characters",

            description:
                `${result.confusable_count} visually similar Unicode character(s) detected.`

        });

    }

    // ==========================================
    // Safe State
    // ==========================================

    if (issues.length === 0) {

        issues.push({

            type: "safe",

            title: "No Homograph Indicators",

            description:
                "No homograph attack indicators were detected."

        });

        issues.push({

            type: "safe",

            title: "Single Script",

            description:
                "Only one writing system was detected."

        });

        issues.push({

            type: "safe",

            title: "No Punycode",

            description:
                "The domain does not use IDN/Punycode encoding."

        });

        issues.push({

            type: "safe",

            title: "Normalization Unchanged",

            description:
                "The normalized domain matches the original."

        });

        issues.push({

            type: "safe",

            title: "No Confusable Characters",

            description:
                "No visually similar Unicode characters were detected."

        });

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

                <ShieldAlert

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

                    Detected Issues

                </h2>

            </div>

            <div className="space-y-4">

                {

                    issues.map(

                        (

                            issue,

                            index

                        ) => (

                            <div

                                key={index}

                                className="

                                    flex

                                    gap-4

                                    p-4

                                    rounded-xl

                                    bg-[#0D1117]

                                    border

                                    border-[#30363D]

                                "

                            >

                                {

                                    issue.type === "safe"

                                    ?

                                    <ShieldCheck

                                        size={20}

                                        className="

                                            text-green-400

                                            mt-1

                                            flex-shrink-0

                                        "

                                    />

                                    :

                                    <AlertTriangle

                                        size={20}

                                        className="

                                            text-yellow-400

                                            mt-1

                                            flex-shrink-0

                                        "

                                    />

                                }

                                <div>

                                    <h3

                                        className="

                                            text-white

                                            font-medium

                                            mb-1

                                        "

                                    >

                                        {issue.title}

                                    </h3>

                                    <p

                                        className="

                                            text-gray-400

                                            text-sm

                                            leading-relaxed

                                        "

                                    >

                                        {issue.description}

                                    </p>

                                </div>

                            </div>

                        )

                    )

                }

            </div>

        </div>

    );

}

export default IssuesCard;