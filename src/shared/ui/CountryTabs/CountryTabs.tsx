import {type FC, useState} from "react";
import "./CountryTabs.scss"

type CountryTabsProps = {
    country: string[];
    onSelect?: (selected: string) => void;
};

export const CountryTabs: FC<CountryTabsProps> = ({country, onSelect}) => {
    const [active, setActive] = useState<string>(country[0] || "");

    const handleClick = (c: string) => {
        setActive(c);
        onSelect?.(c);
    };

    return (
        <div className="country-tabs-wrapper">
            <div className="tabs">
                {country.map((c) => (
                    <span
                        key={c}
                        className={active === c ? "active" : ""}
                        onClick={() => handleClick(c)}
                    >
                        {c}
                    </span>
                ))}
            </div>
        </div>
    );
};
