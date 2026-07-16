import {

    PieChart,

    Pie,

    Cell,

    Tooltip,

    ResponsiveContainer,

    Legend

} from "recharts";

import {

    Globe2

} from "lucide-react";

function TopTLDChart({

    threat

}) {

    if (!threat) return null;

    const COLORS = [

        "#06B6D4",
        "#3B82F6",
        "#8B5CF6",
        "#10B981",
        "#F59E0B",
        "#EF4444",
        "#EC4899",
        "#14B8A6",
        "#A855F7",
        "#64748B"

    ];

    const data = Object.entries(

        threat.top_tlds || {}

    ).map(

        ([name, value]) => ({

            name: `.${name}`,

            value

        })

    );

    return (

        <div

            className="
                bg-[#161B22]
                border
                border-[#30363D]
                rounded-2xl
                p-6
                shadow-lg
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

                <Globe2

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

                    Top Top-Level Domains

                </h2>

            </div>

            <ResponsiveContainer

                width="100%"

                height={360}

            >

                <PieChart>

                    <Pie

                        data={data}

                        dataKey="value"

                        nameKey="name"

                        cx="50%"

                        cy="50%"

                        innerRadius={75}

                        outerRadius={120}

                        paddingAngle={2}

                        animationDuration={1000}

                        animationEasing="ease-out"

                    >

                        {

                            data.map(

                                (_, index) => (

                                    <Cell

                                        key={index}

                                        fill={

                                            COLORS[

                                                index %

                                                COLORS.length

                                            ]

                                        }

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

                            color: "#06B6D4",

                            fontWeight: 600

                        }}

                        formatter={(value) => [

                            value,

                            "Detected URLs"

                        ]}

                    />

                    <Legend

                        verticalAlign="bottom"

                        wrapperStyle={{

                            color:"#9CA3AF",

                            paddingTop:"12px"

                        }}

                    />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default TopTLDChart;