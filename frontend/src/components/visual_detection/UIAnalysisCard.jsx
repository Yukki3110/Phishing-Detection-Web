import {

    LayoutDashboard,

    Keyboard,

    MousePointerClick,

    PanelTop,

    PanelBottom,

    Square

} from "lucide-react";

function UIAnalysisCard({

    result

}) {

    if (!result) return null;

    const ui = result.analyzed_ui;

    const items = [

        {

            icon: Keyboard,

            label: "Input Fields",

            value: ui.input_analysis.input_fields,

            type: "count"

        },

        {

            icon: MousePointerClick,

            label: "Buttons",

            value: ui.button_analysis.buttons,

            type: "count"

        },

        {

            icon: PanelTop,

            label: "Navigation Bar",

            value: ui.navbar_analysis.has_navbar,

            type: "boolean"

        },

        {

            icon: PanelBottom,

            label: "Footer",

            value: ui.footer_analysis.has_footer,

            type: "boolean"

        },

        {

            icon: Square,

            label: "Modal",

            value: ui.modal_analysis.modal_like,

            type: "modal"

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

                <LayoutDashboard

                    size={22}

                    className="text-sky-400"

                />

                <h2

                    className="
                        text-xl
                        font-semibold
                        text-white
                    "

                >

                    UI Analysis

                </h2>

            </div>

            {

                items.map((item, index) => {

                    const Icon = item.icon;

                    let valueComponent;

                    if (item.type === "count") {

                        valueComponent = (

                            <span

                                className="
                                    text-white
                                    font-medium
                                "

                            >

                                {item.value}

                            </span>

                        );

                    }

                    else if (item.type === "modal") {

                        valueComponent = (

                            <span

                                className={`

                                    font-medium

                                    ${

                                        item.value

                                            ? "text-yellow-400"

                                            : "text-green-400"

                                    }

                                `}

                            >

                                {

                                    item.value

                                        ? "Detected"

                                        : "Not Detected"

                                }

                            </span>

                        );

                    }

                    else {

                        valueComponent = (

                            <span

                                className={`

                                    font-medium

                                    ${

                                        item.value

                                            ? "text-green-400"

                                            : "text-red-400"

                                    }

                                `}

                            >

                                {

                                    item.value

                                        ? "Detected"

                                        : "Missing"

                                }

                            </span>

                        );

                    }

                    return (

                        <FeatureRow

                            key={index}

                            icon={

                                <Icon

                                    size={18}

                                    className="text-sky-400"

                                />

                            }

                            title={item.label}

                            value={valueComponent}

                            last={

                                index === items.length - 1

                            }

                        />

                    );

                })

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

export default UIAnalysisCard;