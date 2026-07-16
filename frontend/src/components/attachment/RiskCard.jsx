import { ShieldAlert, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

function RiskCard({ risk }) {

    if (!risk) return null;

    const riskScore = risk.risk_score;

    const riskLevel = risk.risk_level;

    const reasons = risk.reasons || [];

    const [animatedScore, setAnimatedScore] = useState(0);

    useEffect(() => {

        if (riskScore === 0) {

            setAnimatedScore(0);

            return;

        }
        
        let current = 0;

        const interval = setInterval(() => {

            current++;

            setAnimatedScore(current);

            if (current >= riskScore) {

                clearInterval(interval);

            }

        }, 15);

        return () => clearInterval(interval);

    }, [riskScore]);

    const radius = 54;

    const circumference = 2 * Math.PI * radius;

    const offset =
        circumference -
        (animatedScore / 100) * circumference;

    let color = "#22C55E";
    let badgeClass = "bg-green-500/20 text-green-400";

    switch (riskLevel) {

        case "MEDIUM":

            color = "#EAB308";
            badgeClass = "bg-yellow-500/20 text-yellow-400";
            break;

        case "HIGH":

            color = "#F97316";
            badgeClass = "bg-orange-500/20 text-orange-400";
            break;

        case "CRITICAL":

            color = "#EF4444";
            badgeClass = "bg-red-500/20 text-red-400";
            break;

    }

    return (

        <div className="

            bg-[#161B22]

            border border-[#30363D]

            rounded-2xl

            p-8

            shadow-lg

        ">

            <div className="flex items-center gap-3 mb-8">

                <ShieldAlert

                    size={24}

                    className="text-red-400"

                />

                <h2 className="text-xl font-semibold text-white">

                    Attachment Risk

                </h2>

            </div>

            <div className="flex justify-center">

                <div className="relative w-44 h-44">

                    <svg

                        className="w-44 h-44 -rotate-90"

                        viewBox="0 0 120 120"

                    >

                        <circle

                            cx="60"

                            cy="60"

                            r={radius}

                            fill="none"

                            stroke="#30363D"

                            strokeWidth="8"

                        />

                        <circle

                            cx="60"

                            cy="60"

                            r={radius}

                            fill="none"

                            stroke={color}

                            strokeWidth="8"

                            strokeLinecap="round"

                            strokeDasharray={circumference}

                            strokeDashoffset={offset}

                            className="transition-all duration-1000"

                        />

                    </svg>

                    <div className="

                        absolute

                        inset-0

                        flex

                        flex-col

                        items-center

                        justify-center

                    ">

                        <p className="

                            text-5xl

                            font-bold

                            text-white

                        ">

                            {animatedScore}

                        </p>

                        <p className="text-gray-500">

                            /100

                        </p>

                    </div>

                </div>

            </div>

            <div className="text-center mt-8">

                <span className={`

                    px-5

                    py-2

                    rounded-full

                    text-sm

                    font-semibold

                    ${badgeClass}

                `}>

                    {riskLevel} RISK

                </span>

            </div>

            <hr className="border-[#30363D] my-8"/>

            <div>

                <p className="

                    text-xs

                    uppercase

                    tracking-widest

                    text-gray-500

                    mb-4

                ">

                    Risk Factors

                </p>

                {

                    reasons.length === 0 ?

                        <p className="text-green-400">

                            No suspicious indicators detected.

                        </p>

                    :

                        reasons.map((reason,index)=>(

                            <div

                                key={index}

                                className="

                                    flex

                                    gap-3

                                    mb-3

                                "

                            >

                                <AlertTriangle

                                    size={16}

                                    className="

                                        text-yellow-400

                                        mt-1

                                        flex-shrink-0

                                    "

                                />

                                <p className="

                                    text-gray-300

                                    text-sm

                                ">

                                    {reason}

                                </p>

                            </div>

                        ))

                }

            </div>

        </div>

    );

}

export default RiskCard;