import {

    Server

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

function TopHostingChart({

    threat

}) {

    if (!threat) return null;

    const data = Object.entries(

        threat.top_hosting || {}

    ).map(

        ([hosting, count]) => ({

            hosting,

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

                <Server

                    size={22}

                    className="text-orange-400"

                />

                <h2

                    className="
                        text-xl
                        font-semibold
                        text-white
                    "

                >

                    Top Hosting Providers

                </h2>

            </div>

            <ResponsiveContainer

                width="100%"

                height={420}

            >

                <BarChart

                    data={data}

                    layout="vertical"

                    margin={{

                        top:10,

                        right:30,

                        left:90,

                        bottom:10

                    }}

                >

                    <CartesianGrid

                        stroke="#30363D"

                        strokeDasharray="3 3"

                    />

                    <XAxis

                        type="number"

                        tick={{

                            fill:"#9CA3AF"

                        }}

                    />

                    <YAxis

                        type="category"

                        dataKey="hosting"

                        width={180}

                        tick={{

                            fill:"#9CA3AF",

                            fontSize:11

                        }}

                    />

                    <Tooltip

                        cursor={{

                            fill: "rgba(249,115,22,0.08)"

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

                            color: "#F97316",

                            fontWeight: 600

                        }}

                        formatter={(value) => [

                            value,

                            "Hosted URLs"

                        ]}

                    />

                    <Bar

                        dataKey="count"

                        fill="#F97316"

                        radius={[0,8,8,0]}

                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}

export default TopHostingChart;