import { useState } from "react";

import HomographInput from "../components/homograph/HomographInput";
import RiskBanner from "../components/homograph/RiskBanner";
import CharacterAnalysisCard from "../components/homograph/CharacterAnalysisCard";
import UnicodeMetricsCard from "../components/homograph/UnicodeMetricsCard";
import IssuesCard from "../components/homograph/IssuesCard";

import { analyzeHomograph } from "../services/homographService";

function HomographAnalysis() {

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

            const data = await analyzeHomograph(url);

            setResult(data);

        }

        catch {

            setError("Unable to analyze this domain.");

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div className="min-h-screen bg-[#0D1117] px-8 py-10">

            <div className="max-w-7xl mx-auto">

                <HomographInput

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

                            {/* Character Analysis */}

                            <section className="mb-6">

                                <CharacterAnalysisCard

                                    result={result}

                                />

                            </section>

                            {/* Bottom */}

                            <section className="grid lg:grid-cols-2 gap-6">

                                <UnicodeMetricsCard

                                    result={result}

                                />

                                <IssuesCard

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

export default HomographAnalysis;