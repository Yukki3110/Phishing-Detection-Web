import {
    Activity,
    Link2,
    Globe,
    Languages,
    Image,
    Paperclip
} from "lucide-react";

function OverviewCards({ statistics }) {

    if (!statistics) return null;

    const overview = statistics.overview;

    const cards = [

        {
            title: "Total Scans",
            value: overview.total_scans,
            icon: Activity,
            color: "text-cyan-400",
            bg: "bg-cyan-500/10"
        },

        {
            title: "URL Detection",
            value: overview.url_scans,
            icon: Link2,
            color: "text-green-400",
            bg: "bg-green-500/10"
        },

        {
            title: "Domain Intelligence",
            value: overview.domain_scans,
            icon: Globe,
            color: "text-blue-400",
            bg: "bg-blue-500/10"
        },

        {
            title: "Homograph",
            value: overview.homograph_scans,
            icon: Languages,
            color: "text-yellow-400",
            bg: "bg-yellow-500/10"
        },

        {
            title: "Visual Detection",
            value: overview.visual_scans,
            icon: Image,
            color: "text-purple-400",
            bg: "bg-purple-500/10"
        },

        {
            title: "Attachment",
            value: overview.attachment_scans,
            icon: Paperclip,
            color: "text-red-400",
            bg: "bg-red-500/10"
        }

    ];

    return (

        <section className="mb-8">

            <div className="mb-5">

                <h2 className="text-2xl font-bold text-white">

                    Internal Statistics

                </h2>

                <p className="text-gray-400 mt-1">

                    Overview of scan activities performed by the phishing detection system.

                </p>

            </div>

            <div
                className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    xl:grid-cols-3
                    gap-6
                "
            >

                {

                    cards.map((card, index) => {

                        const Icon = card.icon;

                        return (

                            <div

                                key={index}

                                className="
                                    bg-[#161B22]
                                    border
                                    border-[#30363D]
                                    rounded-2xl
                                    p-6
                                    shadow-lg
                                    hover:border-cyan-500/40
                                    hover:-translate-y-1
                                    transition-all
                                    duration-300
                                "

                            >

                                <div
                                    className="
                                        flex
                                        justify-between
                                        items-start
                                    "
                                >

                                    <div>

                                        <p className="text-gray-400 text-sm">

                                            {card.title}

                                        </p>

                                        <h3
                                            className="
                                                text-4xl
                                                font-bold
                                                text-white
                                                mt-3
                                            "
                                        >

                                            {card.value}

                                        </h3>

                                    </div>

                                    <div
                                        className={`
                                            ${card.bg}
                                            p-3
                                            rounded-xl
                                        `}
                                    >

                                        <Icon

                                            size={24}

                                            className={card.color}

                                        />

                                    </div>

                                </div>

                            </div>

                        );

                    })

                }

            </div>

        </section>

    );

}

export default OverviewCards;