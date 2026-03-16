import React from "react";
import reboot from "@/assets/icon/reboot.svg";

export const ReloadButton: React.FC = () => {
    const reloadPage = () => {
        window.location.reload();
    };

    return (
        <button
            className="button flex justify-center items-center h-[16px] w-[16px]"
            onClick={reloadPage}
            aria-label="Reload page"
        >
            <img
                src={reboot}
                alt="reboot"
                className="flex-shrink-0 object-contain block h-[15px] w-[15px]"
            />
        </button>
    );
};
