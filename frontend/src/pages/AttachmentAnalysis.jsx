import { useState } from "react";

import AttachmentInput from "../components/attachment/AttachmentInput";

import RiskCard from "../components/attachment/RiskCard";
import PreviewCard from "../components/attachment/PreviewCard";
import StaticCard from "../components/attachment/StaticCard";
import URLCard from "../components/attachment/URLCard";
import SummaryCard from "../components/attachment/SummaryCard";

import { analyzeAttachment } from "../services/attachmentService";

function AttachmentAnalysis() {

    const [file, setFile] = useState(null);

    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    async function handleAnalyze() {

        if (!file) {

            setError("Please select a file.");

            return;

        }

        setLoading(true);

        setError("");

        setResult(null);

        try {

            const data = await analyzeAttachment(file);

            setResult(data);

        }

        catch (err) {

            console.error(err);

            setError(
                "Unable to analyze this attachment."
            );

        }

        finally {

            setLoading(false);

        }

    }
    console.log("RESULT =", result);

    return (

        <div className="min-h-screen bg-[#0D1117] px-8 py-10">

            <div className="max-w-7xl mx-auto">

                <AttachmentInput

                    file={file}

                    setFile={setFile}

                    onAnalyze={handleAnalyze}

                    loading={loading}

                />

                {

                    error && (

                        <div
                            className="
                                bg-red-500/10
                                border
                                border-red-500
                                rounded-xl
                                p-4
                                text-red-400
                                mb-6
                            "
                        >

                            {error}

                        </div>

                    )

                }

                {

                    result && (

                        <>

                            {/* Risk */}

                            <div className="mb-6">

                                <RiskCard

                                    risk={result.risk_result}

                                />

                            </div>

                            {/* Preview + Static */}

                            <div className="grid lg:grid-cols-2 gap-6 mb-6">

                                <PreviewCard

                                    parser={result.parser_result}

                                    filename={result.filename}

                                />

                                <StaticCard

                                    fileType={
                                        result.file_type_analysis
                                    }

                                    extension={
                                        result.extension_analysis
                                    }

                                    macro={
                                        result.macro_analysis
                                    }

                                />

                            </div>

                            {/* URLs */}

                            <div className="mb-6">

                                <URLCard

                                    urls={
                                        result.url_analysis
                                    }

                                />

                            </div>

                            {/* Summary */}

                            <SummaryCard

                                risk={
                                    result.risk_result
                                }

                                parser={
                                    result.parser_result
                                }

                                urls={
                                    result.extracted_urls
                                }

                                extension={
                                    result.extension_analysis
                                }

                                macro={
                                    result.macro_analysis
                                }

                            />

                        </>

                    )

                }

            </div>

        </div>

    );

}

export default AttachmentAnalysis;