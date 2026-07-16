import {

    ShieldCheck,

    ShieldAlert,

    AlertTriangle

} from "lucide-react";

function RiskBanner({

    result

}) {

    if (!result) return null;

    const risk = result.risk;

    const level = result.risk_level;

    let color = "";

    let bg = "";

    let Icon = ShieldCheck;

    let message = "";

    switch (level) {

        case "LOW":

            color = "text-green-400";

            bg = "bg-green-500/10";

            Icon = ShieldCheck;

            message =
                "No homograph attack indicators were detected.";

            break;

        case "MEDIUM":

            color = "text-yellow-400";

            bg = "bg-yellow-500/10";

            Icon = AlertTriangle;

            message =
                "Some suspicious Unicode patterns were detected.";

            break;

        default:

            color = "text-red-400";

            bg = "bg-red-500/10";

            Icon = ShieldAlert;

            message =
                "Potential homograph attack detected.";

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

                mb-6

            "

        >

            <div

                className="

                    flex

                    justify-between

                    items-center

                    mb-6

                "

            >

                <div

                    className="

                        flex

                        items-center

                        gap-4

                    "

                >

                    <div

                        className={`

                            ${bg}

                            p-4

                            rounded-xl

                        `}

                    >

                        <Icon

                            size={28}

                            className={color}

                        />

                    </div>

                    <div>

                        <h2

                            className={`

                                text-2xl

                                font-bold

                                ${color}

                            `}

                        >

                            {level} RISK

                        </h2>

                        <p className="text-gray-400 mt-1">

                            {message}

                        </p>

                    </div>

                </div>

                <div className="text-right">

                    <p className="text-gray-500 text-sm">

                        Risk Score

                    </p>

                    <p className="text-4xl font-bold text-white">

                        {risk}

                        <span className="text-xl text-gray-500">

                            /100

                        </span>

                    </p>

                </div>

            </div>

            <div

                className="

                    w-full

                    h-3

                    bg-[#0D1117]

                    rounded-full

                    overflow-hidden

                "

            >

                <div

                    className={

                        `

                        h-full

                        rounded-full

                        transition-all

                        duration-700

                        ${

                            level === "LOW"

                            ?

                            "bg-green-500"

                            :

                            level === "MEDIUM"

                            ?

                            "bg-yellow-500"

                            :

                            "bg-red-500"

                        }

                        `

                    }

                    style={{

                        width: `${risk}%`

                    }}

                />

            </div>

        </div>

    );

}

export default RiskBanner;