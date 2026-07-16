import { useEffect, useState } from "react";

import {
    getDashboard
} from "../services/dashboardService";

// ==============================
// Internal
// ==============================

import OverviewCards
from "../components/dashboard_internal/OverviewCards";

import RiskDistributionChart
from "../components/dashboard_internal/RiskDistributionChart";

import ModuleDistributionChart
from "../components/dashboard_internal/ModuleDistributionChart";

import DailyScanChart
from "../components/dashboard_internal/DailyScanChart";

import TopDomainsCard
from "../components/dashboard_internal/TopDomainsCard";

import TopURLsCard
from "../components/dashboard_internal/TopURLsCard";

// ==============================
// Threat Intelligence
// ==============================

import ThreatOverviewCards
from "../components/dashboard_threat/ThreatOverviewCards";

import TopBrandsChart
from "../components/dashboard_threat/TopBrandsChart";

import TopCountriesChart
from "../components/dashboard_threat/TopCountriesChart";

import TopHostingChart
from "../components/dashboard_threat/TopHostingChart";

import TopTLDChart
from "../components/dashboard_threat/TopTLDChart";

import LatestThreatTable
from "../components/dashboard_threat/LatestThreatTable";

function Dashboard() {

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [statistics, setStatistics] = useState(null);

    const [threat, setThreat] = useState(null);

    useEffect(() => {

        async function fetchDashboard() {

            try {

                const data = await getDashboard();

                setStatistics(data.statistics);

                setThreat(data.threat);

            }

            catch {

                setError(

                    "Unable to load dashboard."

                );

            }

            finally {

                setLoading(false);

            }

        }

        fetchDashboard();

    }, []);

    if (loading) {

        return (

            <div className="min-h-screen flex items-center justify-center text-gray-400">

                Loading Dashboard...

            </div>

        );

    }

    if (error) {

        return (

            <div className="max-w-7xl mx-auto px-8 py-10">

                <div
                    className="
                        bg-red-500/10
                        border
                        border-red-500/30
                        rounded-xl
                        p-5
                        text-red-400
                    "
                >

                    {error}

                </div>

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-[#0D1117] px-8 py-10">

            <div className="max-w-7xl mx-auto">

                {/* ========================= */}
                {/* Internal Dashboard */}
                {/* ========================= */}

                <section className="mb-12">

                    <OverviewCards

                        statistics={statistics}

                    />

                </section>

                <section

                    className="
                        grid
                        lg:grid-cols-2
                        gap-6
                        mb-6
                    "

                >

                    <RiskDistributionChart

                        statistics={

                            statistics

                        }

                    />

                    <ModuleDistributionChart

                        statistics={

                            statistics

                        }

                    />

                </section>

                <section className="mb-6">

                    <DailyScanChart

                        statistics={

                            statistics

                        }

                    />

                </section>

                <section

                    className="
                        grid
                        lg:grid-cols-2
                        gap-6
                        mb-14
                    "

                >

                    <TopDomainsCard

                        statistics={

                            statistics

                        }

                    />

                    <TopURLsCard

                        statistics={

                            statistics

                        }

                    />

                </section>

                {/* ========================= */}
                {/* Threat Intelligence */}
                {/* ========================= */}

                <ThreatOverviewCards

                    threat={threat}

                />

                <section

                    className="
                        grid
                        lg:grid-cols-2
                        gap-6
                        mb-6
                    "

                >

                    <TopBrandsChart

                        threat={threat}

                    />

                    <TopCountriesChart

                        threat={threat}

                    />

                </section>

                <section

                    className="
                        grid
                        lg:grid-cols-2
                        gap-6
                        mb-6
                    "

                >

                    <TopHostingChart

                        threat={threat}

                    />

                    <TopTLDChart

                        threat={threat}

                    />

                </section>

                <LatestThreatTable

                    threat={threat}

                />

            </div>

        </div>

    );

}

export default Dashboard;

