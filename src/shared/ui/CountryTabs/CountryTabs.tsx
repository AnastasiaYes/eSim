import {type FC, useState} from "react";
import "./CountryTabs.scss"

interface CountryTabsProps {
    countries: string[]; // а не country
    onSelect: (c: string) => void;
}

export const CountryTabs: FC<CountryTabsProps> = ({ countries, onSelect }) => {
    const [active, setActive] = useState<string>(countries[0] || "");

    const handleClick = (countryCode: string) => {
        setActive(countryCode);
        onSelect?.(countryCode);
    };

    return (
        <div className="country-tabs-wrapper">
            <div className="tabs">
                {countries.map((country) => (
                    <span
                        key={country}
                        className={active === country ? "active" : ""}
                        onClick={() => handleClick(country)}
                    >
                        {country} {/* или country.name если есть поле name */}
                    </span>
                ))}
            </div>
        </div>
    );
};
