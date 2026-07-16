import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./navbar/Navbar";

import Dashboard from "./pages/Dashboard";
import DomainIntelligence from "./pages/DomainIntelligence";
import AttachmentAnalysis from "./pages/AttachmentAnalysis";
import HomographAnalysis from "./pages/Homograph";
import URLDetection from "./pages/URLDetection";
import VisualDetection from "./pages/VisualDetection";

function App() {

    return (

        <BrowserRouter>

            <div className="min-h-screen bg-[#0D1117]">

                <Navbar />

                <main>

                    <Routes>

                        <Route
                            path="/"
                            element={<Dashboard />}
                        />

                        <Route
                            path="/url"
                            element={<URLDetection />}
                        />

                        <Route
                            path="/domain"
                            element={<DomainIntelligence />}
                        />

                        <Route
                            path="/homograph"
                            element={<HomographAnalysis />}
                        />

                        <Route
                            path="/visual"
                            element={<VisualDetection />}
                        />

                        <Route
                            path="/attachment"
                            element={<AttachmentAnalysis />}
                        />

                    </Routes>

                </main>

            </div>

        </BrowserRouter>

    );

}

export default App;