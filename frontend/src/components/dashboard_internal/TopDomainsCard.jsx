import {

    Globe,

    TrendingUp

} from "lucide-react";

function TopDomainsCard({

    statistics

}) {

    if (!statistics) return null;

    const domains = statistics.top_domains;

    const maxCount = Math.max(

        ...domains.map(

            item => item.count

        ),

        1

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
                h-full
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

                <Globe

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

                    Top Domains

                </h2>

            </div>

            <div

                className="
                    space-y-5
                "

            >

                {

                    domains.map(

                        (item,index)=>(

                            <div

                                key={index}

                            >

                                <div

                                    className="
                                        flex
                                        justify-between
                                        items-center
                                        mb-2
                                    "

                                >

                                    <span

                                        className="
                                            text-gray-300
                                            truncate
                                            max-w-[75%]
                                        "

                                    >

                                        {item.domain}

                                    </span>

                                    <span

                                        className="
                                            flex
                                            items-center
                                            gap-1
                                            text-cyan-400
                                            font-semibold
                                        "

                                    >

                                        <TrendingUp size={15}/>

                                        {item.count}

                                    </span>

                                </div>

                                <div

                                    className="
                                        h-2
                                        rounded-full
                                        bg-[#0D1117]
                                        overflow-hidden
                                    "

                                >

                                    <div

                                        className="
                                            h-full
                                            bg-cyan-500
                                            rounded-full
                                        "

                                        style={{

                                            width:`${

                                                item.count

                                                /

                                                maxCount

                                                *

                                                100

                                            }%`

                                        }}

                                    />

                                </div>

                            </div>

                        )

                    )

                }

            </div>

        </div>

    );

}

export default TopDomainsCard;