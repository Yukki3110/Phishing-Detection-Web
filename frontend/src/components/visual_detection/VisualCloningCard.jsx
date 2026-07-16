import {

    CopyCheck,

    CheckCircle2,

    XCircle

} from "lucide-react";

function VisualCloningCard({

    result

}) {

    if (!result) return null;

    const cloning = result.visual_cloning;

    const patterns = [

        {

            label: "Centralized Layout",

            value: cloning.centralized_layout

        },

        {

            label: "Text Cluster",

            value: cloning.text_cluster

        },

        {

            label: "Single Focus Region",

            value: cloning.single_focus_region

        },

        {

            label: "Sparse Page",

            value: cloning.sparse_page

        },

        {

            label: "Vertical Form Pattern",

            value: cloning.vertical_form_pattern

        }

    ];

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

                <CopyCheck

                    size={22}

                    className="text-orange-400"

                />

                <h2

                    className="
                        text-xl
                        font-semibold
                        text-white
                    "

                >

                    Visual Cloning

                </h2>

            </div>

            {

                patterns.map((item, index) => (

                    <FeatureRow

                        key={index}

                        icon={

                            item.value

                                ?

                                <CheckCircle2

                                    size={18}

                                    className="text-green-400"

                                />

                                :

                                <XCircle

                                    size={18}

                                    className="text-gray-500"

                                />

                        }

                        title={item.label}

                        value={

                            item.value

                                ?

                                <span className="text-green-400 font-medium">

                                    Detected

                                </span>

                                :

                                <span className="text-gray-500 font-medium">

                                    Not Detected

                                </span>

                        }

                        last={

                            index === patterns.length - 1

                        }

                    />

                ))

            }

        </div>

    );

}

function FeatureRow({

    icon,

    title,

    value,

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

            {value}

        </div>

    );

}

export default VisualCloningCard;