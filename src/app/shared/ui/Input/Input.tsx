import {useState, useEffect, type ChangeEvent, type FC, type InputHTMLAttributes} from "react";
import clsx from "clsx";

export type Rule = "required" | "email" | "phone" | "amount";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    rules?: Rule[];
    loading?: boolean;
    modelValue?: string;
    onModelChange?: (value: string) => void;
    onValidChange?: (isValid: boolean) => void;
};

export const Input: FC<InputProps> = ({
                                          label,
                                          rules,
                                          loading = false,
                                          modelValue = "",
                                          onModelChange,
                                          onValidChange,
                                          className,
                                          ...props
                                      }) => {
    const [isFocused, setFocused] = useState(false);
    const [touched, setTouched] = useState(false);

    const validators: Record<Rule, (val: string) => string | null> = {
        required: (val) => (val ? null : "This field is required"),
        email: (val) => (/\S+@\S+\.\S+/.test(val) ? null : "Enter a valid email address"),
        phone: (val) =>
            val && !/^\+?[0-9\s\-()]{7,15}$/.test(val) ? "Enter a valid phone number" : null,
        amount: (val) => (!val || Number(val) <= 0 ? "Enter a valid amount" : null),
    };

    const errorMessage = (() => {
        if (!rules) return null;
        for (const rule of rules) {
            const error = validators[rule](modelValue);
            if (error) return error;
        }
        return null;
    })();

    const showError = touched && !!errorMessage;

    useEffect(() => {
        onValidChange?.(!errorMessage);
    }, [errorMessage, onValidChange]);

    // Input handlers
    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        if (rules?.includes("phone")) {
            value = value.replace(/[^0-9+\-\s()]/g, "");
        }

        onModelChange?.(value);
    };

    const handleFocus = () => {
        setTouched(true);
        setFocused(true);
    };

    const handleBlur = () => {
        setFocused(false);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (!rules?.includes("phone")) return;

        const allowedKeys = [
            "0","1","2","3","4","5","6","7","8","9",
            "+","-","(",")"," ","Backspace","Delete","ArrowLeft","ArrowRight","Tab"
        ];

        if (!allowedKeys.includes(e.key)) e.preventDefault();
    };

    return (
        <div className="flex flex-col gap-1 relative">
            {/* Label */}
            <label
                htmlFor={props.name}
                className={clsx(
                    "absolute left-3 transition-all duration-200 pointer-events-none px-[5px] rounded-[8px]",
                    isFocused || modelValue
                        ? "top-[-9px] bg-white text-[12px] text-gray-700"
                        : "top-[50%] -translate-y-1/2 text-gray-400"
                )}
            >
                {label}
            </label>

            {/* Input */}
            <input
                id={props.name}
                value={modelValue}
                onChange={handleInput}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                disabled={loading}
                className={clsx(
                    "border border-gray-100 rounded-[8px] text-gray-500 bg-light-gray px-[12px] py-[15px] focus:ring-1 focus:border-blue-600 w-full box-border",
                    showError && "text-red-500",
                    loading && "opacity-70",
                    className
                )}
                {...props}
            />

            {/* Error */}
            <div className="h-[16px]">
                {showError && <p className="text-red-500 text-[12px]">{errorMessage}</p>}
            </div>
        </div>
    );
};
