import clsx from "clsx";
import type { FC, ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "light";
    disabled?: boolean;
};

export const Button: FC<ButtonProps> = ({
                                            variant = "primary",
                                            disabled = false,
                                            children,
                                            className,
                                            ...props
                                        }) => {
    const variantClass = variant === "light" ? "btn-light" : "btn";
    const disabledClass = disabled ? "btn_disabled" : "";

    return (
        <button
            className={clsx(variantClass, disabledClass, className)}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};
