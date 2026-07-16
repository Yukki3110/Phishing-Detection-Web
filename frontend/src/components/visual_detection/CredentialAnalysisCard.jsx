import {

    KeyRound,

    CheckCircle2,

    XCircle

} from "lucide-react";

function CredentialAnalysisCard({

    result

}) {

    if (!result) return null;

    const matches =
        result.credential_analysis?.matches || [];

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

                <KeyRound

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

                    Credential Analysis

                </h2>

            </div>

            {

                matches.length === 0 ? (

                    <FeatureRow

                        icon={

                            <XCircle

                                size={18}

                                className="text-green-400"

                            />

                        }

                        title="Detected Keywords"

                        value={

                            <span className="text-green-400 font-medium">

                                None

                            </span>

                        }

                        last

                    />

                ) : (

                    matches.map((item, index) => (

                        <FeatureRow

                            key={index}

                            icon={

                                <CheckCircle2

                                    size={18}

                                    className="text-cyan-400"

                                />

                            }

                            title={formatKeyword(item)}

                            value={

                                <span

                                    className="
                                        text-white
                                        font-medium
                                    "

                                >

                                    Detected

                                </span>

                            }

                            last={

                                index === matches.length - 1

                            }

                        />

                    ))

                )

            }

        </div>

    );

}

function FeatureRow({

    icon,

    title,

    value,

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

            {value}

        </div>

    );

}

function formatKeyword(keyword) {

    switch (keyword.toLowerCase()) {

        case "password":

            return "Password";

        case "email":

            return "Email";

        case "log in":

            return "Log In";

        default:

            return keyword
                .replace(/_/g, " ")
                .replace(/\b\w/g, c => c.toUpperCase());

    }

}

export default CredentialAnalysisCard;