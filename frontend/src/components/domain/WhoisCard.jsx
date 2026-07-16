import { Globe, Calendar } from "lucide-react";

function WhoisCard({ domain, creationDate }) {

    return (

        <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-6 h-full">

            <div className="flex items-center gap-2 mb-6">

                <Globe
                    size={20}
                    className="text-blue-400"
                />

                <h2 className="text-white text-lg font-semibold">
                    WHOIS Information
                </h2>

            </div>

            <div>

                <p className="text-xs uppercase tracking-wider text-gray-500">
                    Domain
                </p>

                <p className="text-white mt-1">
                    {domain}
                </p>

            </div>

            <hr className="border-[#30363D] my-5"/>

            <div>

                <p className="text-xs uppercase tracking-wider text-gray-500">
                    Creation Date
                </p>

                <div className="flex items-center gap-2 mt-1">

                    <Calendar
                        size={16}
                        className="text-green-400"
                    />

                    <span className="text-white">
                        {creationDate}
                    </span>

                </div>

            </div>

        </div>

    );

}

export default WhoisCard;