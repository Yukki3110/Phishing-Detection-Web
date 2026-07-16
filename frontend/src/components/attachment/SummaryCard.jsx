import {

    ClipboardCheck,

    ShieldCheck,

    ShieldAlert,

    CheckCircle2,

    AlertTriangle

} from "lucide-react";

function SummaryCard({

    risk,

    parser,

    urls,

    extension,

    macro

}) {

    if (!risk) return null;

    const safe =

        risk.risk_level === "LOW";

    const recommendations = [];

    if (safe) {

        recommendations.push(

            "Attachment appears safe."

        );

        recommendations.push(

            "Still verify the sender before opening."

        );

    }

    else {

        recommendations.push(

            "Open this attachment with caution."

        );

        recommendations.push(

            "Scan the attachment using another antivirus."

        );

        recommendations.push(

            "Do not enable macros unless necessary."

        );

    }

    if (urls.length > 0) {

        recommendations.push(

            "Review extracted URLs before clicking."

        );

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
            "
        >

            <div className="flex items-center gap-3 mb-8">

                <ClipboardCheck

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

                    Analysis Summary

                </h2>

            </div>

            {/* Overall */}

            <div
                className="
                    bg-[#0D1117]
                    border
                    border-[#30363D]
                    rounded-xl
                    p-5
                    mb-8
                "
            >

                <p className="text-gray-500 text-sm">

                    Overall Status

                </p>

                <div className="flex items-center gap-3 mt-3">

                    {

                        safe ?

                        <ShieldCheck
                            className="text-green-400"
                        />

                        :

                        <ShieldAlert
                            className="text-red-400"
                        />

                    }

                    <span
                        className={

                            safe

                            ?

                            "text-green-400 text-xl font-semibold"

                            :

                            "text-red-400 text-xl font-semibold"

                        }
                    >

                        {

                            safe

                            ?

                            "Safe Attachment"

                            :

                            "Suspicious Attachment"

                        }

                    </span>

                </div>

            </div>

            {/* Statistics */}

            <div className="mb-8">

                <p
                    className="
                        text-xs
                        uppercase
                        tracking-widest
                        text-gray-500
                        mb-4
                    "
                >

                    Statistics

                </p>

                <div className="grid grid-cols-2 gap-4">

                    <Stat

                        title="URLs"

                        value={urls.length}

                    />

                    <Stat

                        title="Parser"

                        value={

                            parser.success

                            ?

                            "Success"

                            :

                            "Failed"

                        }

                    />

                    <Stat

                        title="Macros"

                        value={

                            macro.macros_found

                            ?

                            "Detected"

                            :

                            "None"

                        }

                    />

                    <Stat

                        title="Extension"

                        value={

                            extension.dangerous_extension

                            ?

                            "Dangerous"

                            :

                            "Safe"

                        }

                    />

                </div>

            </div>

            {/* Recommendation */}

            <div>

                <p
                    className="
                        text-xs
                        uppercase
                        tracking-widest
                        text-gray-500
                        mb-4
                    "
                >

                    Recommendation

                </p>

                {

                    recommendations.map(

                        (item,index)=>(

                            <div

                                key={index}

                                className="
                                    flex
                                    gap-3
                                    mb-3
                                "

                            >

                                {

                                    safe ?

                                    <CheckCircle2
                                        size={18}
                                        className="text-green-400 mt-1"
                                    />

                                    :

                                    <AlertTriangle
                                        size={18}
                                        className="text-yellow-400 mt-1"
                                    />

                                }

                                <span className="text-gray-300">

                                    {item}

                                </span>

                            </div>

                        )

                    )

                }

            </div>

        </div>

    );

}

function Stat({

    title,

    value

}) {

    return (

        <div
            className="
                bg-[#0D1117]
                border
                border-[#30363D]
                rounded-xl
                p-4
            "
        >

            <p
                className="
                    text-xs
                    uppercase
                    tracking-wider
                    text-gray-500
                "
            >

                {title}

            </p>

            <p
                className="
                    text-white
                    text-lg
                    font-semibold
                    mt-2
                "
            >

                {value}

            </p>

        </div>

    );

}

export default SummaryCard;