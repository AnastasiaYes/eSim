import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "@/assets/logo.png"
import {Navbar} from "@/app/shared/ui/Header/Navbar.tsx";
import {ReloadButton} from "@/app/shared/ui/Header/ReloadButton.tsx";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const menuWrapperRef = useRef<HTMLDivElement | null>(null);

    const handleResize = () => {
        setIsMobile(window.innerWidth < 740);
    };

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // 👆 Клик вне меню
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuWrapperRef.current &&
                !menuWrapperRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header
            className={`relative px-[var(--page-inline-padding)] ${
                isMenuOpen && isMobile ? "header--open" : ""
            }`}
        >
            <div className="flex justify-between items-center max-w-[1240px] mx-auto">
                {/* Лого + десктоп навигация */}
                <div className="w-full flex justify-between items-center relative z-10">
                    <NavLink to="/">
                        <img src={logo} alt="Logo" width={100}/>
                    </NavLink>

                    <nav className="hidden md:block ml-auto">
                        <Navbar />
                    </nav>
                </div>

                {/* Mobile controls */}
                <div
                    ref={menuWrapperRef}
                    className="relative flex items-center gap-[20px]"
                >
                    {isMobile && <ReloadButton className="reboot" />}

                    {isMobile && (
                        <button
                            className={`burger ${isMenuOpen ? "open" : ""}`}
                            onClick={() => setIsMenuOpen((prev) => !prev)}
                            aria-label="Toggle menu"
                        >
                            <span />
                            <span />
                            <span />
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
                    isMenuOpen && isMobile
                        ? "max-h-[1000px] opacity-100"
                        : "max-h-0 opacity-0"
                }`}
            >
                <div className="max-w-[1240px] mx-auto mt-2 flex flex-col gap-2 pb-[20px]">
                    <Navbar onLinkClick={() => setIsMenuOpen(false)} />
                </div>
            </div>

            <div className="border-b mt-2" />
        </header>
    );
};
