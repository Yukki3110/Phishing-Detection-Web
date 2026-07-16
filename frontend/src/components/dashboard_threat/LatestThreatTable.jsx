import {

    ShieldAlert,

    Globe,

    CalendarDays,

    Building2

} from "lucide-react";

function LatestThreatTable({

    threat

}) {

    if (!threat) return null;

    const rows = threat.latest_urls || [];

    function formatDate(date) {

        if (!date) return "-";

        return new Date(date).toLocaleString(

            "en-GB",

            {

                day: "2-digit",

                month: "short",

                year: "numeric",

                hour: "2-digit",

                minute: "2-digit"

            }

        );

    }

    return (

        <div

            className="
                bg-[#161B22]
                border
                border-[#30363D]
                rounded-2xl
                shadow-lg
                overflow-hidden
            "

        >

            {/* Header */}

            <div

                className="
                    flex
                    items-center
                    gap-3
                    px-6
                    py-5
                    border-b
                    border-[#30363D]
                "

            >

                <ShieldAlert

                    size={22}

                    className="text-red-400"

                />

                <h2

                    className="
                        text-xl
                        font-semibold
                        text-white
                    "

                >

                    Latest Threat URLs

                </h2>

            </div>

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr className="border-b border-[#30363D]">

                            <th className="text-left px-6 py-4 text-gray-400 font-medium">

                                URL

                            </th>

                            <th className="text-left px-6 py-4 text-gray-400 font-medium">

                                Brand

                            </th>

                            <th className="text-left px-6 py-4 text-gray-400 font-medium">

                                Country

                            </th>

                            <th className="text-left px-6 py-4 text-gray-400 font-medium">

                                First Seen

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            rows.map((item,index)=>(

                                <tr

                                    key={index}

                                    className="
                                        border-b
                                        border-[#30363D]
                                        hover:bg-[#0D1117]
                                        transition
                                    "

                                >

                                    {/* URL */}

                                    <td className="px-6 py-5">

                                        <div

                                            className="
                                                flex
                                                items-center
                                                gap-3
                                            "

                                        >

                                            <Globe

                                                size={16}

                                                className="text-cyan-400 flex-shrink-0"

                                            />

                                            <span

                                                className="
                                                    text-gray-300
                                                    max-w-[420px]
                                                    truncate
                                                "

                                                title={item.url}

                                            >

                                                {item.url}

                                            </span>

                                        </div>

                                    </td>

                                    {/* Brand */}

                                    <td className="px-6 py-5">

                                        <span

                                            className="
                                                inline-flex
                                                items-center
                                                gap-2
                                                px-3
                                                py-1
                                                rounded-lg
                                                bg-purple-500/10
                                                border
                                                border-purple-500/30
                                                text-purple-400
                                                text-sm
                                                font-medium
                                            "

                                        >

                                            <Building2 size={15}/>

                                            {item.company}

                                        </span>

                                    </td>

                                    {/* Country */}

                                    <td className="px-6 py-5">

                                        <div

                                            className="
                                                flex
                                                items-center
                                                gap-2
                                                text-gray-300
                                            "

                                        >

                                            🌍

                                            {item.country}

                                        </div>

                                    </td>

                                    {/* Date */}

                                    <td className="px-6 py-5">

                                        <div

                                            className="
                                                flex
                                                items-center
                                                gap-2
                                                text-gray-400
                                            "

                                        >

                                            <CalendarDays size={16}/>

                                            {formatDate(

                                                item.first_seen

                                            )}

                                        </div>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default LatestThreatTable;