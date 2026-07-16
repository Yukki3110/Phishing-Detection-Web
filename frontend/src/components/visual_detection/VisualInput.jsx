import { useRef } from "react";

import {

    Upload,

    Image,

    Search

} from "lucide-react";

function VisualInput({

    image,

    preview,

    loading,

    onSelect,

    onAnalyze

}) {

    const inputRef = useRef(null);

    const openFilePicker = () => {

        inputRef.current.click();

    };

    const handleFile = (file) => {

        if (!file) return;

        onSelect(file);

    };

    const handleDrop = (e) => {

        e.preventDefault();

        handleFile(

            e.dataTransfer.files[0]

        );

    };

    return (

        <div

            className="
                bg-[#161B22]
                border
                border-[#30363D]
                rounded-2xl
                p-8
                shadow-lg
                mb-6
            "

        >

            {/* Header */}

            <h1
                className="
                    text-4xl
                    font-bold
                    text-white
                "
            >
                Visual Detection
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
                Upload a website screenshot to analyze visual phishing
                indicators using OCR, UI heuristics and deep learning.
            </p>

            {/* Upload Area */}

            <div

                onClick={openFilePicker}

                onDragOver={(e) => e.preventDefault()}

                onDrop={handleDrop}

                className="
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
                    py-8
                    px-8
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-center
                "

            >

                {

                    preview ?

                    (

                        <>

                            <img

                                src={preview}

                                alt="preview"

                                className="
                                    max-h-[260px]
                                    rounded-xl
                                    border
                                    border-[#30363D]
                                    object-contain
                                    shadow-lg
                                    mb-5
                                "

                            />

                            <p

                                className="
                                    text-white
                                    font-medium
                                "

                            >

                                {image.name}

                            </p>

                            <p

                                className="
                                    text-gray-500
                                    text-sm
                                    mt-2
                                "

                            >

                                Click anywhere to choose another screenshot

                            </p>

                        </>

                    )

                    :

                    (

                        <>

                            <div

                                className="
                                    w-16
                                    h-16
                                    rounded-full
                                    bg-cyan-500/10
                                    flex
                                    items-center
                                    justify-center
                                    mb-5
                                "

                            >

                                <Upload

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

                                Drop Screenshot Here

                            </h3>

                            <p

                                className="
                                    text-gray-400
                                "

                            >

                                or click to browse

                            </p>

                            <p

                                className="
                                    mt-3
                                    text-sm
                                    text-gray-500
                                "

                            >

                                PNG • JPG • JPEG

                            </p>

                        </>

                    )

                }

                <input

                    ref={inputRef}

                    type="file"

                    accept="image/*"

                    hidden

                    onChange={(e) =>

                        handleFile(

                            e.target.files[0]

                        )

                    }

                />

            </div>

            {/* Analyze */}

            <button

                onClick={onAnalyze}

                disabled={

                    !image ||

                    loading

                }

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

                    loading ?

                    "Analyzing Screenshot..."

                    :

                    "Analyze Screenshot"

                }

            </button>

        </div>

    );

}

export default VisualInput;