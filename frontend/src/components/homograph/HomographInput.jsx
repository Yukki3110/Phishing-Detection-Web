import {

    Globe,

    Search

} from "lucide-react";

function HomographInput({

    url,

    setUrl,

    onAnalyze,

    loading

}) {

    return (

        <div className="mb-10">

            {/* Title */}

            <h1
                className="
                    text-4xl
                    font-bold
                    text-white
                "
            >

                Homograph Detection

            </h1>

            <p
                className="
                    text-gray-400
                    mt-2
                    mb-8
                    max-w-2xl
                    leading-relaxed
                "
            >

                Detect Unicode homograph attacks,
                mixed scripts and visually
                confusable characters that
                may impersonate legitimate
                domains.

            </p>

            {/* Input Card */}

            <div

                className="

                    bg-[#161B22]

                    border

                    border-[#30363D]

                    rounded-2xl

                    p-8

                    shadow-lg

                "

            >

                <label

                    className="

                        block

                        text-sm

                        text-gray-400

                        mb-3

                    "

                >

                    Domain / URL

                </label>

                <div className="relative w-full">

                    <Globe

                        size={20}

                        className="

                            absolute

                            left-5

                            top-1/2

                            -translate-y-1/2

                            text-cyan-400

                            pointer-events-none

                        "

                    />

                    <input

                        type="text"

                        value={url}

                        onChange={(event)=>

                            setUrl(

                                event.target.value

                            )

                        }

                        placeholder="https://example.com"

                        className="

                            w-full

                            bg-[#0D1117]

                            border

                            border-[#30363D]

                            rounded-xl

                            pl-16

                            pr-5

                            py-4

                            text-white

                            placeholder:text-gray-500

                            outline-none

                            transition-all

                            duration-300

                            focus:border-cyan-500

                            focus:ring-2

                            focus:ring-cyan-500/20

                            hover:border-cyan-500/40

                        "

                    />

                </div>

                <button

                    onClick={onAnalyze}

                    disabled={loading}

                    className="

                        mt-6

                        w-full

                        bg-cyan-600

                        hover:bg-cyan-700

                        hover:shadow-lg

                        hover:shadow-cyan-500/20

                        disabled:bg-gray-600

                        disabled:cursor-not-allowed

                        rounded-xl

                        py-4

                        flex

                        justify-center

                        items-center

                        gap-3

                        text-white

                        font-semibold

                        transition-all

                        duration-300

                    "

                >

                    <Search

                        size={18}

                    />

                    {

                        loading

                        ?

                        "Analyzing..."

                        :

                        "Analyze Domain"

                    }

                </button>

            </div>

        </div>

    );

}

export default HomographInput;  