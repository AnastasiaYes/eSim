import React from "react";
import {ReloadButton} from "@/app/shared/ui/Header/ReloadButton.tsx";
import "./Header.scss"

type BurgerButtonProps = {
    isMobile: boolean;
    isOpen: boolean;
    onToggle: () => void;
};

export const BurgerButton: React.FC<BurgerButtonProps> = ({
                                                              isMobile,
                                                              isOpen,
                                                              onToggle,
                                                          }) => {
    if (!isMobile) return null; // показываем только на мобильных

    return (
        <div className="relative flex items-center gap-[20px] max-w-[1240px] mx-auto">
            <ReloadButton />

            {/* Бургер */}
            <button
                className={`burger ${isOpen ? "open" : ""}`}
                onClick={onToggle}
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    );
};
