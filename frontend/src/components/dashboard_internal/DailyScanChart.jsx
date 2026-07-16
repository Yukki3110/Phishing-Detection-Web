import {

    ResponsiveContainer,

    LineChart,

    Line,

    CartesianGrid,

    XAxis,

    YAxis,

    Tooltip

} from "recharts";

import {

    CalendarDays

} from "lucide-react";

function DailyScanChart({

    statistics

}) {

    if (!statistics) return null;

    const data = statistics.daily_scans.map(

        item => ({

            date: new Date(item.date)

                .toLocaleDateString(

                    "en-GB",

                    {

                        day: "2-digit",

                        month: "2-digit"

                    }

                ),

            count: item.count

        })

    );

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

                <CalendarDays

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

                    Daily Scan Activity

                </h2>

            </div>

            <ResponsiveContainer

                width="100%"

                height="88%"

            >

                <LineChart

                    data={data}

                >

                    <CartesianGrid

                        stroke="#30363D"

                        strokeDasharray="3 3"

                    />

                    <XAxis

                        dataKey="date"

                        stroke="#9CA3AF"

                    />

                    <YAxis

                        stroke="#9CA3AF"

                    />

                    <Tooltip

                        cursor={{

                            stroke: "#22D3EE",

                            strokeWidth: 1,

                            strokeDasharray: "4 4"

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

                            color: "#22D3EE",

                            fontWeight: 600

                        }}

                        formatter={(value) => [

                            value,

                            "Scans"

                        ]}

                    />

                    <Line

                        type="monotone"

                        dataKey="count"

                        stroke="#22D3EE"

                        strokeWidth={3}

                        dot={{

                            fill:"#22D3EE",

                            r:5

                        }}

                        activeDot={{

                            r:7

                        }}

                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

}

export default DailyScanChart;