import {

    ListChecks,

    CircleAlert,

    CheckCircle2

} from "lucide-react";

function DetectedIndicatorsCard({

    result

}) {

    if (!result) return null;

    const indicators = [];

    // =================================
    // Credential Analysis
    // =================================

    result.credential_analysis.matches.forEach(

        keyword => {

            indicators.push(

                `${keyword} keyword detected`

            );

        }

    );

    // =================================
    // Urgency
    // =================================

    result.urgency_result.matches.forEach(

        keyword => {

            indicators.push(

                `"${keyword}" urgency phrase detected`

            );

        }

    );

    // =================================
    // Trust
    // =================================

    result.trust_result.matches.forEach(

        keyword => {

            indicators.push(

                `"${keyword}" trust-related keyword detected`

            );

        }

    );

    // =================================
    // Visual Cloning
    // =================================

    if (result.visual_cloning.sparse_page)

        indicators.push("Sparse page layout");

    if (result.visual_cloning.vertical_form_pattern)

        indicators.push("Vertical login form");

    if (result.visual_cloning.centralized_layout)

        indicators.push("Centralized layout");

    if (result.visual_cloning.text_cluster)

        indicators.push("Large text cluster");

    if (result.visual_cloning.single_focus_region)

        indicators.push("Single focus region");

    // =================================
    // UI Analysis
    // =================================

    if (

        result.analyzed_ui.input_analysis.suspicious

    )

        indicators.push("Suspicious input fields");

    if (

        !result.analyzed_ui.navbar_analysis.has_navbar

    )

        indicators.push("Missing navigation bar");

    if (

        !result.analyzed_ui.footer_analysis.has_footer

    )

        indicators.push("Missing footer");

    if (

        result.analyzed_ui.modal_analysis.modal_like

    )

        indicators.push("Modal-like dialog detected");

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
                    mb-2
                "

            >

                <ListChecks

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

                    Detected Indicators

                </h2>

            </div>

            <p

                className="
                    text-gray-400
                    text-sm
                    mb-8
                "

            >

                Summary of all suspicious indicators identified during visual analysis.

            </p>

            {

                indicators.length === 0

                ?

                (

                    <div

                        className="
                            flex
                            items-center
                            gap-3
                            py-4
                        "

                    >

                        <CheckCircle2

                            size={20}

                            className="text-green-400"

                        />

                        <span

                            className="
                                text-green-400
                                font-medium
                            "

                        >

                            No suspicious indicators detected.

                        </span>

                    </div>

                )

                :

                (

                    indicators.map(

                        (item, index) => (

                            <IndicatorRow

                                key={index}

                                text={item}

                                last={

                                    index === indicators.length - 1

                                }

                            />

                        )

                    )

                )

            }

        </div>

    );

}

function IndicatorRow({

    text,

    last = false

}) {

    return (

        <div

            className={`
                flex
                items-center
                gap-3
                py-4
                ${
                    !last

                        ? "border-b border-[#30363D]"

                        : ""

                }
            `}

        >

            <CircleAlert

                size={18}

                className="text-yellow-400 flex-shrink-0"

            />

            <span

                className="
                    text-gray-300
                "

            >

                {text}

            </span>

        </div>

    );

}

export default DetectedIndicatorsCard;