import { createPortal } from "react-dom";

const Portal = ({ id, children }: { id: string; children: React.ReactNode }) => {
    if (typeof window === "undefined") return null;

    let container = document.getElementById(id);

    if (!container) {
        container = document.createElement("div");
        container.id = id;
        document.body.appendChild(container);
    }

    return createPortal(children, container);
};

export default Portal;
