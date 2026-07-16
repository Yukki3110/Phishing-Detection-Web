import {

    Link2,

    TrendingUp

} from "lucide-react";

function TopURLsCard({

    statistics

}) {

    if (!statistics) return null;

    const urls = statistics.top_urls;

    const maxCount = Math.max(

        ...urls.map(

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

                <Link2

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

                    Top URLs

                </h2>

            </div>

            <div

                className="
                    space-y-5
                "

            >

                {

                    urls.map(

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
                                        gap-4
                                    "

                                >

                                    <span

                                        title={item.url}

                                        className="
                                            text-gray-300
                                            truncate
                                            flex-1
                                        "

                                    >

                                        {item.url}

                                    </span>

                                    <span

                                        className="
                                            flex
                                            items-center
                                            gap-1
                                            text-cyan-400
                                            font-semibold
                                            shrink-0
                                        "

                                    >

                                        <TrendingUp

                                            size={15}

                                        />

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
                                            rounded-full
                                            bg-cyan-500
                                        "

                                        style={{

                                            width: `${

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

export default TopURLsCard;