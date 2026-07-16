import {

    Link2,
    ShieldCheck,
    ShieldAlert,
    Hash,
    Ruler,
    Layers3,
    Binary,
    AlertTriangle,
    ArrowRightLeft

} from "lucide-react";

function LexicalFeaturesCard({

    result

}) {

    if (!result) return null;

    const lexical =
        result.url_analysis.lexical;

    return (

        <div

            className="
                bg-[#161B22]
                border
                border-[#30363D]
                rounded-2xl
                p-8
                shadow-lg
                h-full
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

                    Lexical Features

                </h2>

            </div>

            <Feature

                icon={

                    lexical.has_https

                        ?

                        <ShieldCheck
                            className="text-green-400"
                            size={18}
                        />

                        :

                        <ShieldAlert
                            className="text-red-400"
                            size={18}
                        />

                }

                title="HTTPS"

                value={
                    lexical.has_https
                        ? "Yes"
                        : "No"
                }

                valueColor={
                    lexical.has_https
                        ? "text-green-400"
                        : "text-red-400"
                }

            />

            <Feature

                icon={

                    <Binary

                        size={18}

                        className="text-yellow-400"

                    />

                }

                title="Contains IP"

                value={
                    lexical.contains_ip
                        ? "Yes"
                        : "No"
                }

                valueColor={
                    lexical.contains_ip
                        ? "text-red-400"
                        : "text-green-400"
                }

            />

            <Feature

                icon={

                    <Hash

                        size={18}

                        className="text-purple-400"

                    />

                }

                title="Punycode"

                value={
                    lexical.has_punycode
                        ? "Detected"
                        : "None"
                }

                valueColor={
                    lexical.has_punycode
                        ? "text-yellow-400"
                        : "text-green-400"
                }

            />

            <Feature

                icon={

                    <AlertTriangle

                        size={18}

                        className="text-orange-400"

                    />

                }

                title="Suspicious Keywords"

                value={

                    lexical.suspicious_keywords

                }

                valueColor={
                    lexical.suspicious_keywords > 0

                        ?

                        "text-yellow-400"

                        :

                        "text-green-400"
                }

            />

            <Feature

                icon={

                    <ArrowRightLeft

                        size={18}

                        className="text-red-400"

                    />

                }

                title="Redirect Pattern"

                value={
                    lexical.redirect_pattern
                        ? "Detected"
                        : "None"
                }

                valueColor={
                    lexical.redirect_pattern
                        ? "text-red-400"
                        : "text-green-400"
                }

            />

            <Feature

                icon={

                    <Ruler

                        size={18}

                        className="text-cyan-400"

                    />

                }

                title="URL Length"

                value={`${lexical.url_length} chars`}

            />

            <Feature

                icon={

                    <Hash

                        size={18}

                        className="text-pink-400"

                    />

                }

                title="URL Entropy"

                value={

                    lexical.url_entropy.toFixed(2)

                }

            />

            <Feature

                icon={

                    <Layers3

                        size={18}

                        className="text-blue-400"

                    />

                }

                title="Subdomains"

                value={

                    lexical.subdomains

                }

                last

            />

        </div>

    );

}

function Feature({

    icon,

    title,

    value,

    valueColor = "text-white",

    last = false

}) {

    return (

        <div

            className={`
                flex
                justify-between
                items-center
                py-4
                ${
                    !last
                        ? "border-b border-[#30363D]"
                        : ""
                }
            `}

        >

            <div

                className="
                    flex
                    items-center
                    gap-3
                "

            >

                {icon}

                <span className="text-gray-400">

                    {title}

                </span>

            </div>

            <span

                className={`
                    font-semibold
                    ${valueColor}
                `}

            >

                {value}

            </span>

        </div>

    );

}

export default LexicalFeaturesCard;