import {

    Building2

} from "lucide-react";

import {

    ResponsiveContainer,

    BarChart,

    CartesianGrid,

    XAxis,

    YAxis,

    Tooltip,

    Bar

} from "recharts";

function TopBrandsChart({

    threat

}) {

    if (!threat) return null;

    const data = Object.entries(

        threat.top_brands || {}

    ).map(

        ([brand, count]) => ({

            brand:

                brand.charAt(0).toUpperCase() +

                brand.slice(1),

            count

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

                <Building2

                    size={22}

                    className="text-purple-400"

                />

                <h2

                    className="
                        text-xl
                        font-semibold
                        text-white
                    "

                >

                    Top Targeted Brands

                </h2>

            </div>

            <ResponsiveContainer

                width="100%"

                height={320}

            >

                <BarChart

                    data={data}

                    margin={{

                        top: 10,

                        right: 20,

                        left: -10,

                        bottom: 40

                    }}

                >

                    <CartesianGrid

                        stroke="#30363D"

                        strokeDasharray="3 3"

                    />

                    <XAxis

                        dataKey="brand"

                        angle={-25}

                        textAnchor="end"

                        tick={{

                            fill: "#9CA3AF",

                            fontSize: 12

                        }}

                    />

                    <YAxis

                        tick={{

                            fill: "#9CA3AF"

                        }}

                    />

                    <Tooltip

                        cursor={{

                            fill: "rgba(139,92,246,0.08)"

                        }}

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

                            color: "#A855F7",

                            fontWeight: 600

                        }}

                        formatter={(value) => [

                            value,

                            "Detected URLs"

                        ]}

                    />

                    <Bar

                        dataKey="count"

                        radius={[8,8,0,0]}

                        fill="#8B5CF6"

                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}

export default TopBrandsChart;