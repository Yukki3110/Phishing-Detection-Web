import { useState } from "react";

import URLInput from "../components/url_detection/URLInput";
import RiskBanner from "../components/url_detection/URLRiskBanner";
import LexicalFeaturesCard from "../components/url_detection/LexicalFeaturesCard";
import ContentFeaturesCard from "../components/url_detection/ContentFeaturesCard";
import DomainIntelligenceCard from "../components/url_detection/DomainCard";

import { analyzeURL } from "../services/urlDetectionService";

function URLDetection() {

    const [url, setUrl] = useState("");

    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    async function handleAnalyze() {

        if (!url.trim()) {

            setError("Please enter a URL.");

            return;

        }

        setLoading(true);

        setError("");

        setResult(null);

        try {

            const data = await analyzeURL(url);

            setResult(data);

        }

        catch {

            setError("Unable to analyze this URL.");

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div className="min-h-screen bg-[#0D1117] px-8 py-10">

            <div className="max-w-7xl mx-auto">

                <URLInput

                    url={url}

                    setUrl={setUrl}

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

                            <section className="mb-6">

                                <RiskBanner

                                    result={result}

                                />

                            </section>

                            {/* URL Analysis */}

                            <section

                                className="
                                    grid
                                    lg:grid-cols-2
                                    gap-6
                                    mb-6
                                "

                            >

                                <LexicalFeaturesCard

                                    result={result}

                                />

                                <ContentFeaturesCard

                                    result={result}

                                />

                            </section>

                            {/* Domain Intelligence */}

                            <section>

                                <DomainIntelligenceCard

                                    result={result}

                                />

                            </section>

                        </>

                    )

                }

            </div>

        </div>

    );

}

export default URLDetection;