import {type FC } from "react";
import clsx from 'clsx';
import "./CountryTabs.scss";

interface CountryTabsProps {
    countries: Array<{ code: string; name: string }>;
    onSelect: (c: string) => void;
}

export const CountryTabs: FC<CountryTabsProps> = ({countries, onSelect}) => {
    const getFlagUrl = (code: string) =>
        `https://flagcdn.com/${code.toLowerCase()}.svg`;

    const handleClick = (countryCode: string) => {
        onSelect?.(countryCode);
    };

    return (
        <div className="grid grid-cols-2 gap-4">
            {countries.map((country) => (
                <div
                    key={country.code}
                    onClick={() => handleClick(country.code)}
                    className={clsx(
                        "flex items-center flex-col gap-4 p-4 rounded-xl border border-gray-100 shadow-md transition-all duration-300",
                        "cursor-pointer hover:shadow-lg hover:scale-[1.02]"
                    )}
                >
                    <img
                        src={getFlagUrl(country.code)}
                        alt={country.name}
                        className="w-[100px] h-[100px] object-cover rounded-full flex-shrink-0 border border-gray-100 shadow-md "
                    />

                    <h3 className="text-lg font-semibold text-center">
                        {country.name}
                    </h3>
                </div>
            ))}
        </div>
    );
};
