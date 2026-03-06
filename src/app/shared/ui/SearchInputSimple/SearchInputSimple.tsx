import { type FC, useRef } from "react";
import searchIcon from "@/assets/icon/search.svg";

interface SearchInputSimpleProps {
    value: string;
    placeholder?: string;
    onChange: (value: string) => void;
}

export const SearchInputSimple: FC<SearchInputSimpleProps> = ({
                                                      value,
                                                      placeholder = "Search",
                                                      onChange,
                                                  }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    const handleSearchClick = () => {
        inputRef.current?.focus();
    };

    return (
        <div className="relative w-full">
            <button
                type="button"
                onClick={handleSearchClick}
                className="absolute left-3 top-[31%]"
            >
                <img src={searchIcon} alt="search" />
            </button>
            <input
                ref={inputRef}
                value={value}
                onChange={handleInput}
                type="text"
                placeholder={placeholder}
                className="w-full border border-[var(--color-gray-100)] bg-[var(--bg-light-gray)] text-gray-500 rounded-[8px] pl-[35px] pr-[10px] py-[10px] outline-none focus:border-blue-600"
            />
        </div>
    );
};
