import {
    Globe,
    Link,
    ShieldCheck,
    ShieldAlert,
    AlertTriangle
} from "lucide-react";

function URLCard({ urls }) {

    if (!urls) return null;

    function getBadge(level) {

        switch (level) {

            case "LOW":

                return {
                    color: "bg-green-500/20 text-green-400",
                    icon: <ShieldCheck size={18} className="text-green-400"/>
                };

            case "MEDIUM":

                return {
                    color: "bg-yellow-500/20 text-yellow-400",
                    icon: <AlertTriangle size={18} className="text-yellow-400"/>
                };

            case "HIGH":

                return {
                    color: "bg-red-500/20 text-red-400",
                    icon: <ShieldAlert size={18} className="text-red-400"/>
                };

            default:

                return {
                    color: "bg-gray-500/20 text-gray-400",
                    icon: <Link size={18}/>
                };

        }

    }

    return (

        <div
            className="
                bg-[#161B22]
                border
                border-[#30363D]
                rounded-2xl
                p-8
            "
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

                <div className="flex items-center gap-3">

                    <Globe
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

                        Extracted URLs

                    </h2>

                </div>

                <span className="text-gray-400">

                    {urls.length} URL(s)

                </span>

            </div>

            {/* Empty */}

            {

                urls.length === 0 && (

                    <div
                        className="
                            h-56
                            rounded-xl
                            border
                            border-dashed
                            border-[#30363D]
                            flex
                            items-center
                            justify-center
                            text-gray-500
                        "
                    >

                        No URLs detected in this attachment.

                    </div>

                )

            }

            {/* URL List */}

            {

                urls.length > 0 && (

                    <div className="space-y-4">

                        {

                            urls.map((item,index)=>{

                                const badge = getBadge(
                                    item.risk_level
                                );

                                return (

                                    <div

                                        key={index}

                                        className="
                                            bg-[#0D1117]
                                            border
                                            border-[#30363D]
                                            rounded-xl
                                            p-5
                                        "

                                    >

                                        <div
                                            className="
                                                flex
                                                justify-between
                                                items-start
                                                gap-6
                                            "
                                        >

                                            <div className="flex gap-3">

                                                {badge.icon}

                                                <div>

                                                    <p
                                                        className="
                                                            text-white
                                                            break-all
                                                            font-medium
                                                        "
                                                    >

                                                        {item.url}

                                                    </p>

                                                    <p
                                                        className="
                                                            text-gray-500
                                                            text-sm
                                                            mt-2
                                                        "
                                                    >

                                                        Prediction:
                                                        <span className="text-cyan-400 ml-2">

                                                            {item.prediction}

                                                        </span>

                                                    </p>

                                                </div>

                                            </div>

                                            <div className="text-right">

                                                <span
                                                    className={`
                                                        px-3
                                                        py-1
                                                        rounded-full
                                                        text-xs
                                                        font-semibold
                                                        ${badge.color}
                                                    `}
                                                >

                                                    {item.risk_level}

                                                </span>

                                                <p
                                                    className="
                                                        text-gray-400
                                                        mt-3
                                                        text-sm
                                                    "
                                                >

                                                    Risk Score

                                                </p>

                                                <p
                                                    className="
                                                        text-white
                                                        font-bold
                                                        text-lg
                                                    "
                                                >

                                                    {item.risk_score}/100

                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                );

                            })

                        }

                    </div>

                )

            }

        </div>

    );

}

export default URLCard;