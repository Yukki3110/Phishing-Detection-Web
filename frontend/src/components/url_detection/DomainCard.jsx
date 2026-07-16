import {

    Globe,
    Shield,
    Server,
    Calendar,
    ShieldCheck,
    ShieldAlert

} from "lucide-react";

function DomainIntelligenceCard({

    result

}) {

    if (!result) return null;

    const domain =
        result.domain_info;

    const ssl =
        domain.ssl_info;

    const dns =
        domain.dns_analysis;

    const reputation =
        domain.reputation;

    return (

        <div

            className="
                bg-[#161B22]
                border
                border-[#30363D]
                rounded-2xl
                p-8
                shadow-lg
            "

        >

            {/* Header */}

            <div

                className="
                    flex
                    items-center
                    gap-3
                    mb-8
                "

            >

                <Globe

                    size={24}

                    className="text-cyan-400"

                />

                <h2

                    className="
                        text-xl
                        font-semibold
                        text-white
                    "

                >

                    Domain Intelligence

                </h2>

            </div>

            <div

                className="
                    grid
                    md:grid-cols-2
                    gap-6
                "

            >

                {/* SSL */}

                <SectionCard

                    icon={
                        <Shield
                            size={20}
                            className="text-green-400"
                        />
                    }

                    title="SSL Certificate"

                >

                    <Item

                        label="Status"

                        value={
                            ssl.valid
                                ? "Valid"
                                : "Invalid"
                        }

                        color={
                            ssl.valid
                                ? "text-green-400"
                                : "text-red-400"
                        }

                    />

                    <Item

                        label="Issuer"

                        value={ssl.issuer}

                    />

                    <Item

                        label="Subject"

                        value={ssl.subject}

                    />

                    <Item

                        label="Expires"

                        value={ssl.expires}

                    />

                </SectionCard>

                {/* DNS */}

                <SectionCard

                    icon={
                        <Server
                            size={20}
                            className="text-blue-400"
                        />
                    }

                    title="DNS Analysis"

                >

                    <Item

                        label="Record Count"

                        value={dns.record_count}

                    />

                    <Item

                        label="Issues"

                        value={

                            dns.issues.length === 0

                                ?

                                "None"

                                :

                                dns.issues.join(", ")

                        }

                        color={

                            dns.issues.length === 0

                                ?

                                "text-green-400"

                                :

                                "text-yellow-400"

                        }

                    />

                    <Item

                        label="DNS Records"

                        value={

                            domain.dns_records.join(", ")

                        }

                    />

                </SectionCard>

                {/* Reputation */}

                <SectionCard

                    icon={

                        reputation.risk_level === "LOW"

                        ?

                        <ShieldCheck

                            size={20}

                            className="text-green-400"

                        />

                        :

                        <ShieldAlert

                            size={20}

                            className="text-red-400"

                        />

                    }

                    title="Reputation"

                >

                    <Item

                        label="Status"

                        value={

                            reputation.risk_level

                        }

                        color={

                            reputation.risk_level === "LOW"

                                ?

                                "text-green-400"

                                :

                                reputation.risk_level === "MEDIUM"

                                ?

                                "text-yellow-400"

                                :

                                "text-red-400"

                        }

                    />

                    <Item

                        label="Reasons"

                        value={

                            reputation.reasons.length === 0

                                ?

                                "No issues detected"

                                :

                                reputation.reasons.join(", ")

                        }

                    />

                </SectionCard>

                {/* Domain Information */}

                <SectionCard

                    icon={

                        <Calendar

                            size={20}

                            className="text-orange-400"

                        />

                    }

                    title="Domain Information"

                >

                    <Item

                        label="Creation Date"

                        value={

                            domain.creation_date

                        }

                    />

                </SectionCard>

            </div>

        </div>

    );

}

function SectionCard({

    icon,

    title,

    children

}) {

    return (

        <div

            className="
                bg-[#0D1117]
                border
                border-[#30363D]
                rounded-xl
                p-5
            "

        >

            <div

                className="
                    flex
                    items-center
                    gap-3
                    mb-5
                "

            >

                {icon}

                <h3

                    className="
                        text-white
                        font-semibold
                    "

                >

                    {title}

                </h3>

            </div>

            <div className="space-y-4">

                {children}

            </div>

        </div>

    );

}

function Item({

    label,

    value,

    color = "text-white"

}) {

    return (

        <div

            className="
                flex
                justify-between
                gap-6
            "

        >

            <span className="text-gray-400">

                {label}

            </span>

            <span

                className={`
                    text-right
                    break-all
                    ${color}
                `}

            >

                {value}

            </span>

        </div>

    );

}

export default DomainIntelligenceCard;