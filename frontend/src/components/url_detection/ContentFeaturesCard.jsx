import {

    FileCode2,
    ShieldCheck,
    ShieldAlert,
    Lock,
    Image,
    Layout,
    ArrowRightLeft

} from "lucide-react";

function ContentFeaturesCard({

    result

}) {

    if (!result) return null;

    const content =
        result.url_analysis.content;

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

                <FileCode2

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

                    Content Features

                </h2>

            </div>

            <Feature

                icon={

                    <Lock

                        size={18}

                        className="text-red-400"

                    />

                }

                title="Login Form"

                value={
                    content.login_form
                        ? "Detected"
                        : "None"
                }

                valueColor={
                    content.login_form
                        ? "text-yellow-400"
                        : "text-green-400"
                }

            />

            <Feature

                icon={

                    <Layout

                        size={18}

                        className="text-purple-400"

                    />

                }

                title="Hidden Fields"

                value={
                    content.hidden_fields
                        ? "Detected"
                        : "None"
                }

                valueColor={
                    content.hidden_fields
                        ? "text-yellow-400"
                        : "text-green-400"
                }

            />

            <Feature

                icon={

                    <ShieldCheck

                        size={18}

                        className="text-green-400"

                    />

                }

                title="Page Title"

                value={
                    content.has_title
                        ? "Present"
                        : "Missing"
                }

                valueColor={
                    content.has_title
                        ? "text-green-400"
                        : "text-red-400"
                }

            />

            <Feature

                icon={

                    <Image

                        size={18}

                        className="text-blue-400"

                    />

                }

                title="Favicon"

                value={
                    content.has_favicon
                        ? "Present"
                        : "Missing"
                }

                valueColor={
                    content.has_favicon
                        ? "text-green-400"
                        : "text-red-400"
                }

            />

            <Feature

                icon={

                    <ArrowRightLeft

                        size={18}

                        className="text-orange-400"

                    />

                }

                title="Redirects"

                value={
                    content.redirects
                }

            />

            <Feature

                icon={

                    content.iframes > 0

                    ?

                    <ShieldAlert

                        size={18}

                        className="text-yellow-400"

                    />

                    :

                    <ShieldCheck

                        size={18}

                        className="text-green-400"

                    />

                }

                title="iFrames"

                value={
                    content.iframes
                }

                valueColor={
                    content.iframes > 0
                        ? "text-yellow-400"
                        : "text-green-400"
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

export default ContentFeaturesCard;