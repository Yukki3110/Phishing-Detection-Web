import { Shield, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

function ReputationCard({ reputation }) {

    if (!reputation) return null;

    const trustScore = 100 - reputation.risk_score;

    const [animatedScore, setAnimatedScore] = useState(0);

    const [showBadge, setShowBadge] = useState(false);

    useEffect(() => {

        setAnimatedScore(0);

        setShowBadge(false);

        let current = 0;

        const interval = setInterval(() => {

            current++;

            setAnimatedScore(current);

            if (current >= trustScore) {

                clearInterval(interval);

                setTimeout(() => {

                    setShowBadge(true);

                }, 150);

            }

        }, 15);

        return () => clearInterval(interval);

    }, [trustScore]);

    const radius = 58;

    const circumference = 2 * Math.PI * radius;

    const offset =
        circumference -
        (animatedScore / 100) * circumference;

    let badgeColor = "";

    let circleColor = "";

    switch (reputation.risk_level) {

        case "LOW":

            badgeColor = "bg-green-500/20 text-green-400";

            circleColor = "#22C55E";

            break;

        case "MEDIUM":

            badgeColor = "bg-yellow-500/20 text-yellow-400";

            circleColor = "#EAB308";

            break;

        case "HIGH":

            badgeColor = "bg-orange-500/20 text-orange-400";

            circleColor = "#F97316";

            break;

        default:

            badgeColor = "bg-red-500/20 text-red-400";

            circleColor = "#EF4444";

    }

    return (

        <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-8">

            <div className="flex items-center gap-2 mb-8">

                <Shield
                    size={22}
                    className="text-yellow-400"
                />

                <h2 className="text-white text-lg font-semibold">

                    Domain Trust Score

                </h2>

            </div>

            <div className="flex justify-center mb-8">

                <div className="relative w-44 h-44">

                    <svg
                        className="w-44 h-44 -rotate-90"
                        viewBox="0 0 140 140"
                    >

                        <circle

                            cx="70"
                            cy="70"
                            r={radius}

                            fill="none"

                            stroke="#30363D"

                            strokeWidth="10"

                        />

                        <circle

                            cx="70"
                            cy="70"
                            r={radius}

                            fill="none"

                            stroke={circleColor}

                            strokeWidth="10"

                            strokeLinecap="round"

                            strokeDasharray={circumference}

                            strokeDashoffset={offset}


                        />

                    </svg>

                    <div
                        className="
                            absolute
                            inset-0
                            flex
                            flex-col
                            items-center
                            justify-center
                        "
                    >

                        <p className="text-5xl font-bold text-white">

                            {animatedScore}

                        </p>

                        <p className="text-sm text-gray-500">

                            /100

                        </p>

                    </div>

                </div>

            </div>

            <div
                className={`
                    text-center
                    mb-8
                    transition-all
                    duration-500
                    ${showBadge
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2"}
                `}
            >

                <span
                    className={`px-5 py-2 rounded-full text-sm font-semibold ${badgeColor}`}
                >

                    {reputation.risk_level} RISK

                </span>

            </div>

            <hr className="border-[#30363D] mb-6"/>

            <div>

                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-5">

                    Analysis

                </p>

                {

                    reputation.reasons.length === 0 ?

                        <div className="text-green-400 text-sm">

                            No suspicious indicators detected.

                        </div>

                    :

                        reputation.reasons.map((reason,index)=>(

                            <div
                                key={index}
                                className="flex items-start gap-3 mb-4"
                            >

                                <AlertTriangle
                                    size={16}
                                    className="text-yellow-400 mt-1 flex-shrink-0"
                                />

                                <p className="text-gray-300 text-sm leading-6">

                                    {reason}

                                </p>

                            </div>

                        ))

                }

            </div>

        </div>

    );

}

export default ReputationCard;