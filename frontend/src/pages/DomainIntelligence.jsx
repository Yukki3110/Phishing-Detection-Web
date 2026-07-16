import { useState } from "react";

import DomainInput from "../components/domain/DomainInput.jsx";
import ReputationCard from "../components/domain/ReputationCard.jsx";
import WhoisCard from "../components/domain/WhoisCard.jsx";
import DNSCard from "../components/domain/DNSCard.jsx";
import SSLCard from "../components/domain/SSLCard.jsx";

import { analyzeDomain } from "../services/domainService";

function DomainIntelligence() {

    const [domain, setDomain] = useState("");

    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    async function handleAnalyze() {

        if (!domain.trim()) {

            setError("Please enter a domain.");

            return;
        }

        setLoading(true);

        setError("");

        setResult(null);

        try {

            const data = await analyzeDomain(domain);

            setResult(data);

        }

        catch (err) {

            console.error(err);

            setError(err.message);

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div className="min-h-screen bg-[#0D1117] px-8 py-10">

            <div className="max-w-7xl mx-auto">

                <DomainInput

                    domain={domain}

                    setDomain={setDomain}

                    onAnalyze={handleAnalyze}

                    loading={loading}

                />

                {

                    error && (

                        <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-400 mb-6">

                            {error}

                        </div>

                    )

                }

                {

                    result && (

                        <>

                            <div className="mb-6">

                                <ReputationCard

                                    reputation={
                                        result.domain_analysis.reputation
                                    }

                                />

                            </div>

                            <div className="grid lg:grid-cols-2 gap-6 mb-6 items-stretch">

                                <WhoisCard

                                    domain={result.domain}

                                    creationDate={
                                        result.domain_analysis.creation_date
                                    }

                                />

                                <DNSCard

                                    dnsRecords={
                                        result.domain_analysis.dns_records
                                    }

                                    dnsAnalysis={
                                        result.domain_analysis.dns_analysis
                                    }

                                />

                            </div>

                            <SSLCard

                                ssl={
                                    result.domain_analysis.ssl_info
                                }

                            />

                        </>

                    )

                }

            </div>

        </div>

    );

}

export default DomainIntelligence;