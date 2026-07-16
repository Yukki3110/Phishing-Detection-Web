import { useState } from "react";

import VisualInput from "../components/visual_detection/VisualInput";
import PredictionBanner from "../components/visual_detection/PredictionBanner";
import CredentialAnalysisCard from "../components/visual_detection/CredentialAnalysisCard";
import CNNPredictionCard from "../components/visual_detection/CNNPredictionCard";
import VisualCloningCard from "../components/visual_detection/VisualCloningCard";
import UIAnalysisCard from "../components/visual_detection/UIAnalysisCard";
import DetectedIndicatorsCard from "../components/visual_detection/DetectedIndicatorsCard";

import { analyzeVisual } from "../services/visualDetectionService";

function VisualDetection() {

    const [image, setImage] = useState(null);

    const [preview, setPreview] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [result, setResult] = useState(null);

    // ================================
    // Select Image
    // ================================

    function handleSelect(file) {

        if (!file) return;

        setImage(file);

        setPreview(

            URL.createObjectURL(file)

        );

        setResult(null);

        setError("");

    }

    // ================================
    // Analyze
    // ================================

    async function handleAnalyze() {

        if (!image) return;

        setLoading(true);

        setError("");

        setResult(null);

        try {

            const response = await analyzeVisual(

                image

            );

            setResult(response);

        }

        catch (err) {

            setError(

                err.message ||

                "Visual analysis failed."

            );

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div className="min-h-screen bg-[#0D1117] px-8 py-10">

            <div className="max-w-7xl mx-auto">

                {/* Upload */}

                <VisualInput

                    image={image}

                    preview={preview}

                    loading={loading}

                    onSelect={handleSelect}

                    onAnalyze={handleAnalyze}

                />

                {/* Error */}

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

                            {/* Prediction */}

                            <section className="mb-6">

                                <PredictionBanner

                                    result={result}

                                />

                            </section>

                            {/* Analysis */}

                            <section

                                className="
                                    grid
                                    lg:grid-cols-2
                                    gap-6
                                    mb-6
                                "

                            >

                                <CredentialAnalysisCard

                                    result={result}

                                />

                                <CNNPredictionCard

                                    result={result}

                                />

                            </section>

                            {/* Visual */}

                            <section

                                className="
                                    grid
                                    lg:grid-cols-2
                                    gap-6
                                    mb-6
                                "

                            >

                                <VisualCloningCard

                                    result={result}

                                />

                                <UIAnalysisCard

                                    result={result}

                                />

                            </section>

                            {/* Indicators */}

                            <section>

                                <DetectedIndicatorsCard

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

export default VisualDetection;