import {
    LayoutDashboard,
    Link2,
    Globe,
    Languages,
    Image,
    Paperclip,
    ShieldCheck
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menus = [

    {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/"
    },

    {
        title: "URL Detection",
        icon: Link2,
        path: "/url"
    },

    {
        title: "Domain Analysis",
        icon: Globe,
        path: "/domain"
    },

    {
        title: "Homograph Analysis",
        icon: Languages,
        path: "/homograph"
    },

    {
        title: "Visual Detection",
        icon: Image,
        path: "/visual"
    },

    {
        title: "Attachment Analysis",
        icon: Paperclip,
        path: "/attachment"
    }

];

function Navbar() {

    return (

        <header
            className="
                sticky
                top-0
                z-50
                bg-[#0D1117]/95
                backdrop-blur-md
                border-b
                border-[#30363D]
            "
        >

            <div
                className="
                    max-w-[1600px]
                    mx-auto
                    px-8
                    h-16
                    flex
                    items-center
                    justify-between
                "
            >

                {/* Logo */}

                <NavLink

                    to="/"

                    className="
                        flex
                        items-center
                        gap-3
                        select-none
                    "

                >

                    <div
                        className="
                            w-10
                            h-10
                            rounded-xl
                            bg-cyan-500/10
                            border
                            border-cyan-500/20
                            flex
                            items-center
                            justify-center
                        "
                    >

                        <ShieldCheck
                            size={22}
                            className="text-cyan-400"
                        />

                    </div>

                    <div>

                        <h1
                            className="
                                text-white
                                font-bold
                                text-lg
                                leading-none
                            "
                        >

                            Phishing Detection

                        </h1>

                        <p
                            className="
                                text-xs
                                text-gray-400
                            "
                        >

                            Detection & Threat Intelligence

                        </p>

                    </div>

                </NavLink>

                {/* Menu */}

                <nav
                    className="
                        flex
                        items-center
                        gap-2
                    "
                >

                    {

                        menus.map(item => {

                            const Icon = item.icon;

                            return (

                                <NavLink

                                    key={item.path}

                                    to={item.path}

                                    end={item.path === "/"}

                                    className={({ isActive }) => `

                                        flex
                                        items-center
                                        gap-2

                                        px-4
                                        py-2

                                        rounded-xl

                                        text-sm
                                        font-medium

                                        transition-all
                                        duration-300

                                        ${

                                            isActive

                                                ?

                                                `
                                                bg-cyan-500/10
                                                border
                                                border-cyan-500/30
                                                text-cyan-400
                                                shadow-lg
                                                shadow-cyan-500/10
                                                `

                                                :

                                                `
                                                text-gray-300
                                                border
                                                border-transparent
                                                hover:bg-[#161B22]
                                                hover:border-[#30363D]
                                                hover:text-cyan-400
                                                `
                                        }

                                    `}

                                >

                                    <Icon size={18} />

                                    <span>

                                        {item.title}

                                    </span>

                                </NavLink>

                            );

                        })

                    }

                </nav>

            </div>

        </header>

    );

}

export default Navbar;