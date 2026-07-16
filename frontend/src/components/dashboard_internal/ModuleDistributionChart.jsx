import {

    ResponsiveContainer,

    BarChart,

    Bar,

    CartesianGrid,

    XAxis,

    YAxis,

    Tooltip,

    Cell

} from "recharts";

import {

    Boxes

} from "lucide-react";

function ModuleDistributionChart({

    statistics

}) {

    if (!statistics) return null;

    const module = statistics.module_distribution;

    const data = [

        {

            module: "URL",

            scans: module.URL,

            color: "#22C55E"

        },

        {

            module: "Domain",

            scans: module.Domain,

            color: "#3B82F6"

        },

        {

            module: "Homograph",

            scans: module.Homograph,

            color: "#FACC15"

        },

        {

            module: "Visual",

            scans: module.Visual,

            color: "#A855F7"

        },

        {

            module: "Attachment",

            scans: module.Attachment,

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
                h-[430px]
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

                <Boxes

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

                    Module Distribution

                </h2>

            </div>

            <ResponsiveContainer

                width="100%"

                height="88%"

            >

                <BarChart

                    data={data}

                >

                    <CartesianGrid

                        stroke="#30363D"

                        strokeDasharray="3 3"

                    />

                    <XAxis

                        dataKey="module"

                        stroke="#9CA3AF"

                    />

                    <YAxis

                        stroke="#9CA3AF"

                    />

                    <Tooltip
                        cursor={{
                            fill: "rgba(34,211,238,0.08)"
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

                    <Bar

                        dataKey="scans"

                        radius={[8,8,0,0]}

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

                    </Bar>

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}

export default ModuleDistributionChart;