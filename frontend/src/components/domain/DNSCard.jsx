import { Server } from "lucide-react";

function DNSCard({ dnsRecords, dnsAnalysis }) {

    if (!dnsAnalysis) return null;

    return (

        <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-6 h-full">

            <div className="flex items-center gap-2 mb-6">

                <Server
                    size={20}
                    className="text-blue-400"
                />

                <h2 className="text-white text-lg font-semibold">
                    DNS Analysis
                </h2>

            </div>

            <div>

                <p className="text-xs uppercase tracking-wider text-gray-500">
                    Record Count
                </p>

                <p className="text-white text-2xl font-semibold mt-1">
                    {dnsAnalysis.record_count}
                </p>

            </div>

            <hr className="border-gray-700 my-5"/>

            <div>

                <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Issues
                </p>

                {

                    dnsAnalysis.issues.length === 0 ?

                        <p className="text-green-400">
                            No issues detected
                        </p>

                    :

                        dnsAnalysis.issues.map((issue,index)=>(

                            <div
                                key={index}
                                className="text-yellow-400 text-sm mb-2"
                            >

                                • {issue}

                            </div>

                        ))

                }

            </div>

            <hr className="border-gray-700 my-5"/>

            <div>

                <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                    DNS Records
                </p>

                <div className="space-y-1 mt-3">

                    {dnsRecords.map((ip,index)=>(

                        <p
                            key={index}
                            className="
                                text-green-400
                                font-mono
                                text-sm
                            "
                        >
                            {ip}
                        </p>

                    ))}

                </div>

            </div>

        </div>

    );

}
console.log("DNSCard module loaded");   
export default DNSCard;