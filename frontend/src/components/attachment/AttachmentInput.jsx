import { UploadCloud, Search } from "lucide-react";

function AttachmentInput({

    file,

    setFile,

    onAnalyze,

    loading

}) {

    function handleFileChange(event) {

        const selectedFile = event.target.files[0];

        if (selectedFile) {

            setFile(selectedFile);

        }

    }

    return (

        <div className="mb-10">

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

                {/* Title */}

                <h1

                    className="
                        text-4xl
                        font-bold
                        text-white
                    "

                >

                    Attachment Analysis

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

                    Analyze uploaded documents and archives to detect
                    suspicious files, embedded URLs, phishing indicators,
                    and potentially malicious attachments.

                </p>

                {/* Upload Area */}

                <label

                    className="
                        block
                        cursor-pointer
                        border-2
                        border-dashed
                        border-[#30363D]
                        rounded-2xl
                        bg-[#0D1117]
                        hover:border-cyan-500
                        hover:shadow-lg
                        hover:shadow-cyan-500/10
                        transition-all
                        duration-300
                        py-10
                        px-8
                        text-center
                    "

                >

                    <input

                        type="file"

                        className="hidden"

                        onChange={handleFileChange}

                    />

                    <div

                        className="
                            w-16
                            h-16
                            rounded-full
                            bg-cyan-500/10
                            flex
                            items-center
                            justify-center
                            mx-auto
                            mb-5
                        "

                    >

                        <UploadCloud

                            size={30}

                            className="text-cyan-400"

                        />

                    </div>

                    <h3

                        className="
                            text-lg
                            font-semibold
                            text-white
                            mb-2
                        "

                    >

                        Drop Attachment Here

                    </h3>

                    <p className="text-gray-400">

                        or click to browse

                    </p>

                    <p

                        className="
                            mt-3
                            text-sm
                            text-gray-500
                        "

                    >

                        PDF • DOCX • ZIP • ODT • Other documents

                    </p>

                    {

                        file && (

                            <div

                                className="
                                    mt-8
                                    inline-block
                                    bg-[#161B22]
                                    border
                                    border-[#30363D]
                                    rounded-xl
                                    px-5
                                    py-3
                                "

                            >

                                <p

                                    className="
                                        text-cyan-400
                                        font-medium
                                    "

                                >

                                    {file.name}

                                </p>

                                <p

                                    className="
                                        text-gray-500
                                        text-sm
                                        mt-1
                                    "

                                >

                                    {(file.size / 1024).toFixed(2)} KB

                                </p>

                            </div>

                        )

                    }

                </label>

                {/* Analyze Button */}

                <button

                    onClick={onAnalyze}

                    disabled={!file || loading}

                    className="
                        mt-8
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

                    <Search size={18} />

                    {

                        loading

                            ? "Analyzing..."

                            : "Analyze Attachment"

                    }

                </button>

            </div>

        </div>

    );

}

export default AttachmentInput;