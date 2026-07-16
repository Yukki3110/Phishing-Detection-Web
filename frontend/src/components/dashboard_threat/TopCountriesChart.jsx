import {

    MapPinned

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

function TopCountriesChart({

    threat

}) {

    if (!threat) return null;

    const data = Object.entries(

        threat.top_countries || {}

    ).map(

        ([country, count]) => ({

            country,

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

                <MapPinned

                    size={22}

                    className="text-green-400"

                />

                <h2

                    className="
                        text-xl
                        font-semibold
                        text-white
                    "

                >

                    Top Source Countries

                </h2>

            </div>

            <ResponsiveContainer

                width="100%"

                height={320}

            >

                <BarChart

                    data={data}

                    margin={{

                        top:10,

                        right:20,

                        left:-10,

                        bottom:70

                    }}

                >

                    <CartesianGrid

                        stroke="#30363D"

                        strokeDasharray="3 3"

                    />

                    <XAxis

                        dataKey="country"

                        angle={-25}

                        textAnchor="end"

                        interval={0}

                        tick={{

                            fill:"#9CA3AF",

                            fontSize:11

                        }}

                    />

                    <YAxis

                        tick={{

                            fill:"#9CA3AF"

                        }}

                    />

                    <Tooltip

                        cursor={{

                            fill: "rgba(34,197,94,0.08)"

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

                            color: "#22C55E",

                            fontWeight: 600

                        }}

                        formatter={(value) => [

                            value,

                            "Detected URLs"

                        ]}

                    />

                    <Bar

                        dataKey="count"

                        fill="#22C55E"

                        radius={[8,8,0,0]}

                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}

export default TopCountriesChart;