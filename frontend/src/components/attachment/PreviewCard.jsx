import { FileText } from "lucide-react";

function PreviewCard({ parser }) {

    if (!parser) return null;

    return (

        <div className="

            bg-[#161B22]

            border border-[#30363D]

            rounded-2xl

            p-8

            shadow-lg

        ">

            {/* Header */}

            <div className="flex items-center gap-3 mb-6">

                <FileText

                    size={22}

                    className="text-blue-400"

                />

                <h2 className="text-xl font-semibold text-white">

                    File Preview

                </h2>

            </div>

            {/* Status */}

            <div className="mb-5">

                <span

                    className={`

                        px-3

                        py-1

                        rounded-full

                        text-sm

                        font-semibold

                        ${

                            parser.success

                            ? "bg-green-500/20 text-green-400"

                            : "bg-red-500/20 text-red-400"

                        }

                    `}

                >

                    {

                        parser.success

                        ? "Successfully Parsed"

                        : "Unable to Parse"

                    }

                </span>

            </div>

            {/* Preview */}

            <div

                className="

                    bg-[#0D1117]

                    border border-[#30363D]

                    rounded-xl

                    p-5

                    h-72

                    overflow-y-auto

                "

            >

                {

                    parser.preview ?

                    <pre

                        className="

                            whitespace-pre-wrap

                            break-words

                            text-gray-300

                            text-sm

                            leading-7

                            font-mono

                        "

                    >

                        {parser.preview}

                    </pre>

                    :

                    <p className="text-gray-500">

                        No preview available.

                    </p>

                }

            </div>

            {/* Footer */}

            <div className="mt-5 flex justify-between text-sm">

                <span className="text-gray-500">

                    Showing first 500 characters

                </span>

                <span className="text-blue-400">

                    Preview Only

                </span>

            </div>

        </div>

    );

}

export default PreviewCard;