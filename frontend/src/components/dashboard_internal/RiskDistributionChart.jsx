import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

import {
    ShieldAlert
} from "lucide-react";

function RiskDistributionChart({

    statistics

}) {

    if (!statistics) return null;

    const risk = statistics.risk_distribution;

    const data = [

        {

            name: "Low",

            value: risk.LOW,

            color: "#22C55E"

        },

        {

            name: "Medium",

            value: risk.MEDIUM,

            color: "#FACC15"

        },

        {

            name: "High",

            value: risk.HIGH,

            color: "#EF4444"

        }

    ];

    return (

        <div

            className="
                bg-[#161B22]
                border
                border-[#30363D]
                rounded-2xl
                shadow-lg
                p-6
                h-[420px]
            "

        >

            {/* Header */}

            <div

                className="
                    flex
                    items-center
                    gap-3
                    mb-6
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

                    Risk Distribution

                </h2>

            </div>

            <ResponsiveContainer

                width="100%"

                height="90%"

            >

                <PieChart>

                    <Pie

                        data={data}

                        dataKey="value"

                        nameKey="name"

                        innerRadius={70}

                        outerRadius={120}

                        paddingAngle={4}

                        animationDuration={1000}

                        animationEasing="ease-out"

                    >

                        {

                            data.map(

                                (entry,index)=>(

                                    <Cell

                                        key={index}

                                        fill={entry.color}

                                    />

                                )

                            )

                        }

                    </Pie>

                    <Tooltip


                        contentStyle={{

                            background: "#1E2530",

                            border: "1px solid #4B5563",

                            borderRadius: "12px",

                            color: "#F9FAFB",

                            boxShadow: "0 8px 24px rgba(0,0,0,.35)"

                        }}

                        labelStyle={{

                            color: "#FFFFFF",

                            fontWeight: 600

                        }}

                        itemStyle={{

                            color: "#22D3EE",

                            fontWeight: 600

                        }}

                        formatter={(value) => [

                            value,

                            "Cases"

                        ]}

                    />

                    <Legend

                        wrapperStyle={{

                            color:"#D1D5DB"

                        }}

                    />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default RiskDistributionChart;