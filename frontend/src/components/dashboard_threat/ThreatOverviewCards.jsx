import {

    Globe,

    Building2,

    MapPinned,

    Server

} from "lucide-react";

function ThreatOverviewCards({

    threat

}) {

    if (!threat) return null;

    const topBrand = Object.entries(
        threat.top_brands || {}
    )[0];

    const topCountry = Object.entries(
        threat.top_countries || {}
    )[0];

    const topHosting = Object.entries(
        threat.top_hosting || {}
    )[0];

    function formatBrand(text) {

        if (!text) return "-";

        return text

            .split(" ")

            .map(

                word =>

                    word.charAt(0).toUpperCase() +

                    word.slice(1)

            )

            .join(" ");

    }

    return (

        <section className="mb-8">

            {/* Header */}

            <div className="mb-6">

                <h2

                    className="
                        text-2xl
                        font-bold
                        text-white
                    "

                >

                    Threat Intelligence

                </h2>

                <p

                    className="
                        text-gray-400
                        mt-2
                    "

                >

                    Open-source phishing intelligence used
                    to enrich internal detection statistics
                    and provide broader threat visibility.

                </p>

            </div>

            <div

                className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    xl:grid-cols-4
                    gap-6
                "

            >

                <OverviewCard

                    icon={

                        <Globe

                            size={28}

                            className="text-cyan-400"

                        />

                    }

                    title="Active URLs"

                    value={

                        threat.active_urls

                    }

                    subtitle="Open-source feed"

                />

                <OverviewCard

                    icon={

                        <Building2

                            size={28}

                            className="text-purple-400"

                        />

                    }

                    title="Top Brand"

                    value={

                        formatBrand(

                            topBrand?.[0]

                        )

                    }

                    subtitle={`${

                        topBrand?.[1] || 0

                    } URLs detected`}

                />

                <OverviewCard

                    icon={

                        <MapPinned

                            size={28}

                            className="text-green-400"

                        />

                    }

                    title="Top Country"

                    value={

                        topCountry?.[0] || "-"

                    }

                    subtitle={`${

                        topCountry?.[1] || 0

                    } URLs detected`}

                />

                <OverviewCard

                    icon={

                        <Server

                            size={28}

                            className="text-orange-400"

                        />

                    }

                    title="Top Hosting"

                    value={

                        topHosting?.[0] || "-"

                    }

                    subtitle={`${

                        topHosting?.[1] || 0

                    } URLs hosted`}

                />

            </div>

        </section>

    );

}

function OverviewCard({

    icon,

    title,

    value,

    subtitle

}) {

    return (

        <div

            className="
                bg-[#161B22]
                border
                border-[#30363D]
                rounded-2xl
                p-6
                shadow-lg
                h-full
                hover:border-cyan-500/30
                hover:-translate-y-1
                transition-all
                duration-300
            "

        >

            <div

                className="
                    flex
                    justify-between
                    items-center
                    mb-5
                "

            >

                <span

                    className="
                        text-gray-400
                        text-sm
                        font-medium
                    "

                >

                    {title}

                </span>

                {icon}

            </div>

            <div

                className="
                    text-3xl
                    font-bold
                    text-white
                    leading-relaxed
                    break-words
                "

            >

                {value}

            </div>

            <div

                className="
                    mt-3
                    text-sm
                    text-gray-500
                "

            >

                {subtitle}

            </div>

        </div>

    );

}

export default ThreatOverviewCards;