import {type FC, useEffect, useRef, useState} from "react";
import "./CountryTabs.scss";

interface CountryTabsProps {
    countries: Array<{ code: string; name: string }>;
    onSelect: (c: string) => void;
}

export const CountryTabs: FC<CountryTabsProps> = ({ countries, onSelect }) => {
    const [active, setActive] = useState<string>(countries[0]?.code || "");
    const [showLeftFade, setShowLeftFade] = useState(false);
    const [showRightFade, setShowRightFade] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const checkScroll = () => {
        if (wrapperRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = wrapperRef.current;
            setShowLeftFade(scrollLeft > 5);
            setShowRightFade(scrollLeft + clientWidth < scrollWidth - 5);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, [countries]);

    const handleClick = (countryCode: string) => {
        setActive(countryCode);
        onSelect?.(countryCode);
    };

    return (
        <div className="country-tabs-wrapper relative">
            {showLeftFade && (
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
            )}

            {showRightFade && (
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
            )}

            <div
                ref={wrapperRef}
                className="country-tabs-wrapper-inner"
                onScroll={checkScroll}
            >
                <div className="tabs">
                    {countries.map((country) => (
                        <span
                            key={country.code}
                            className={active === country.code ? "active" : ""}
                            onClick={() => handleClick(country.code)}
                        >
                            {country.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};
