import {
    Type,
    ArrowDown,
    Languages,
    Globe2,
    CheckCircle2
} from "lucide-react";

function CharacterAnalysisCard({

    result

}) {

    if (!result) return null;

    const originalInput =
        result.original_input;

    const hostname =
        result.original_domain;

    const normalized =
        result.normalized_domain;

    const decoded =
        result.decoded_domain;

    const scripts =
        result.scripts || [];

    const characters =
        result.confusable_chars || [];

    // Remove duplicated confusable characters
    const uniqueCharacters = Array.from(

        new Map(

            characters.map(item => [

                `${item.character}-${item.looks_like}`,

                item

            ])

        ).values()

    );

    return (

        <div
            className="
                bg-[#161B22]
                border
                border-[#30363D]
                rounded-2xl
                p-8
                shadow-lg
                mb-6
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

                <Type
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

                    Character Analysis

                </h2>

            </div>

            {/* Flow */}

            <div className="space-y-5">

                <AnalysisBox

                    title="Original Input"

                    value={originalInput}

                    color="text-white"

                />

                <Arrow />

                <AnalysisBox

                    title="Extracted Hostname"

                    value={hostname}

                    color="text-cyan-400"

                />

                {

                    result.is_punycode && (

                        <>

                            <Arrow />

                            <AnalysisBox

                                title="Decoded Domain"

                                value={decoded}

                                color="text-yellow-400"

                            />

                        </>

                    )

                }

                <Arrow />

                <AnalysisBox

                    title="Normalized Domain"

                    value={normalized}

                    color="text-green-400"

                />

            </div>

            {/* Divider */}

            <div className="border-t border-[#30363D] my-8" />

            {/* Scripts */}

            <div className="mb-8">

                <div
                    className="
                        flex
                        items-center
                        gap-2
                        mb-4
                    "
                >

                    <Languages
                        size={18}
                        className="text-green-400"
                    />

                    <h3
                        className="
                            text-white
                            font-medium
                        "
                    >

                        Detected Scripts

                    </h3>

                </div>

                <div
                    className="
                        flex
                        flex-wrap
                        gap-3
                    "
                >

                    {

                        scripts.map((script,index)=>(

                            <div

                                key={index}

                                className="
                                    flex
                                    items-center
                                    gap-2
                                    bg-green-500/10
                                    border
                                    border-green-500/30
                                    rounded-lg
                                    px-4
                                    py-2
                                "

                            >

                                <CheckCircle2
                                    size={15}
                                    className="text-green-400"
                                />

                                <span
                                    className="
                                        text-green-400
                                        text-sm
                                        font-medium
                                    "
                                >

                                    {script}

                                </span>

                            </div>

                        ))

                    }

                </div>

            </div>

            {/* Confusable */}

            <div>

                <div
                    className="
                        flex
                        items-center
                        gap-2
                        mb-4
                    "
                >

                    <Globe2
                        size={18}
                        className="text-red-400"
                    />

                    <h3
                        className="
                            text-white
                            font-medium
                        "
                    >

                        Confusable Characters

                    </h3>

                </div>

                {

                    uniqueCharacters.length === 0

                    ?

                    (

                        <div
                            className="
                                bg-[#0D1117]
                                border
                                border-[#30363D]
                                rounded-xl
                                py-6
                                text-center
                                text-gray-500
                            "
                        >

                            No visually similar Unicode characters detected.

                        </div>

                    )

                    :

                    (

                        <div
                            className="
                                flex
                                flex-col
                                gap-3
                            "
                        >

                            <div
                                className="
                                    grid
                                    grid-cols-3
                                    px-5
                                    text-xs
                                    uppercase
                                    text-gray-500
                                    font-medium
                                "
                            >

                                <span>

                                    Unicode

                                </span>

                                <span className="text-center">

                                </span>

                                <span className="text-right">

                                    Looks Like

                                </span>

                            </div>

                            {

                                uniqueCharacters.map((item,index)=>(

                                    <div

                                        key={index}

                                        className="
                                            grid
                                            grid-cols-3
                                            items-center
                                            bg-[#0D1117]
                                            border
                                            border-[#30363D]
                                            rounded-xl
                                            px-5
                                            py-4
                                        "

                                    >

                                        <span
                                            className="
                                                text-3xl
                                                font-bold
                                                text-red-400
                                            "
                                        >

                                            {item.character}

                                        </span>

                                        <div className="flex justify-center">

                                            <ArrowDown
                                                size={18}
                                                className="
                                                    rotate-[-90deg]
                                                    text-gray-500
                                                "
                                            />

                                        </div>

                                        <span
                                            className="
                                                text-right
                                                text-3xl
                                                font-bold
                                                text-green-400
                                            "
                                        >

                                            {item.looks_like}

                                        </span>

                                    </div>

                                ))

                            }

                        </div>

                    )

                }

            </div>

        </div>

    );

}

function Arrow() {

    return (

        <div
            className="
                flex
                justify-center
            "
        >

            <ArrowDown
                className="
                    text-cyan-400
                "
            />

        </div>

    );

}

function AnalysisBox({

    title,

    value,

    color

}) {

    return (

        <div>

            <p
                className="
                    text-gray-500
                    text-sm
                    mb-2
                "
            >

                {title}

            </p>

            <div
                className="
                    bg-[#0D1117]
                    border
                    border-[#30363D]
                    rounded-xl
                    p-4
                    break-all
                "
            >

                <span className={color}>

                    {value}

                </span>

            </div>

        </div>

    );

}

export default CharacterAnalysisCard;