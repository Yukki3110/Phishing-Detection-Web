import {
    FileCode2,
    FileType2,
    HardDrive,
    ShieldCheck,
    ShieldAlert,
    CheckCircle2,
    XCircle
} from "lucide-react";

function StaticCard({

    fileType,

    extension,

    macro

}) {

    if (

        !fileType ||

        !extension ||

        !macro

    ) return null;

    function formatSize(bytes) {

        if (bytes < 1024)

            return `${bytes} B`;

        if (bytes < 1024 * 1024)

            return `${(bytes / 1024).toFixed(2)} KB`;

        return `${(bytes / 1024 / 1024).toFixed(2)} MB`;

    }

    function Item({

        icon,

        title,

        value,

        color = "text-white"

    }) {

        return (

            <div
                className="
                    bg-[#0D1117]
                    border
                    border-[#30363D]
                    rounded-xl
                    p-5
                "
            >

                <div className="flex items-center gap-2 mb-3">

                    {icon}

                    <p
                        className="
                            text-xs
                            uppercase
                            tracking-wider
                            text-gray-500
                        "
                    >
                        {title}
                    </p>

                </div>

                <p
                    className={`

                        text-lg

                        font-semibold

                        ${color}

                        break-words
                        
                        whitespace-normal

                    `}
                >

                    {value}

                </p>

            </div>

        );

    }

    return (

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

            <div className="flex items-center gap-3 mb-8">

                <ShieldCheck

                    size={22}

                    className="text-cyan-400"

                />

                <h2
                    className="
                        text-xl
                        font-semibold
                        text-white
                    "
                >

                    Static Analysis

                </h2>

            </div>

            <div
                className="
                    grid
                    md:grid-cols-2
                    gap-5
                "
            >

                <Item

                    icon={

                        <FileType2

                            size={18}

                            className="text-blue-400"

                        />

                    }

                    title="MIME Type"

                    value={

                        fileType.mime_type

                    }

                />

                <Item

                    icon={

                        <FileCode2

                            size={18}

                            className="text-yellow-400"

                        />

                    }

                    title="Extensions"

                    value={

                        extension.extensions.join(" ")

                    }

                />

                <Item

                    icon={

                        <HardDrive

                            size={18}

                            className="text-purple-400"

                        />

                    }

                    title="File Size"

                    value={

                        formatSize(

                            fileType.file_size_bytes

                        )

                    }

                />

                <Item

                    icon={

                        macro.macros_found ?

                        <ShieldAlert

                            size={18}

                            className="text-red-400"

                        />

                        :

                        <ShieldCheck

                            size={18}

                            className="text-green-400"

                        />

                    }

                    title="Macros"

                    value={

                        macro.macros_found

                        ?

                        "Detected"

                        :

                        "Not Found"

                    }

                    color={

                        macro.macros_found

                        ?

                        "text-red-400"

                        :

                        "text-green-400"

                    }

                />

            </div>

            <hr
                className="
                    border-[#30363D]
                    my-8
                "
            />

            <div
                className="
                    space-y-4
                "
            >

                <div className="flex items-center gap-3">

                    {

                        fileType.mime_mismatch ?

                        <XCircle

                            size={18}

                            className="text-red-400"

                        />

                        :

                        <CheckCircle2

                            size={18}

                            className="text-green-400"

                        />

                    }

                    <span className="text-gray-300">

                        {

                            fileType.mime_mismatch

                            ?

                            "File signature does not match extension"

                            :

                            "File signature matches extension"

                        }

                    </span>

                </div>

                <div className="flex items-center gap-3">

                    {

                        extension.dangerous_extension ?

                        <XCircle

                            size={18}

                            className="text-red-400"

                        />

                        :

                        <CheckCircle2

                            size={18}

                            className="text-green-400"

                        />

                    }

                    <span className="text-gray-300">

                        {

                            extension.dangerous_extension

                            ?

                            "Dangerous extension detected"

                            :

                            "No dangerous extension"

                        }

                    </span>

                </div>

                <div className="flex items-center gap-3">

                    {

                        extension.double_extension ?

                        <XCircle

                            size={18}

                            className="text-yellow-400"

                        />

                        :

                        <CheckCircle2

                            size={18}

                            className="text-green-400"

                        />

                    }

                    <span className="text-gray-300">

                        {

                            extension.double_extension

                            ?

                            "Double extension detected"

                            :

                            "No double extension"

                        }

                    </span>

                </div>

            </div>

        </div>

    );

}

export default StaticCard;