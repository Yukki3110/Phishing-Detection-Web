import { Lock } from "lucide-react";

function SSLCard({ ssl }) {

    if (!ssl) return null;

    return (

        <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-6">

            <div className="flex items-center gap-2 mb-6">

                <Lock
                    size={20}
                    className="text-blue-400"
                />

                <h2 className="text-white text-lg font-semibold">
                    SSL Certificate
                </h2>

            </div>

            <div>

                <p className="text-xs uppercase tracking-wider text-gray-500">
                    Status
                </p>

                <p
                    className={`mt-1 font-semibold ${
                        ssl.valid
                            ? "text-green-400"
                            : "text-red-400"
                    }`}
                >

                    {ssl.valid ? "Valid" : "Invalid"}

                </p>

            </div>

            <hr className="border-[#30363D] my-5"/>

            <div>

                <p className="text-xs uppercase tracking-wider text-gray-500">
                    Issuer
                </p>

                <p className="text-white mt-1">
                    {ssl.issuer}
                </p>

            </div>

            <hr className="border-[#30363D] my-5"/>

            <div>

                <p className="text-xs uppercase tracking-wider text-gray-500">
                    Subject
                </p>

                <p className="text-white mt-1">
                    {ssl.subject}
                </p>

            </div>

            <hr className="border-[#30363D] my-5"/>

            <div>

                <p className="text-xs uppercase tracking-wider text-gray-500">
                    Expires
                </p>

                <p className="text-white mt-1">
                    {ssl.expires}
                </p>

            </div>

        </div>

    );

}

export default SSLCard;