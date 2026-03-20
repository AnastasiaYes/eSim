import type {FC} from "react";
import {SectionHeader} from "@/shared/ui/SectionHeader/SectionHeader.tsx";
import {SkeletonLoader} from "@/shared/ui/SkeletonLoader/SkeletonLoader.tsx";
import {CountryTabs} from "@/shared/ui/CountryTabs/CountryTabs.tsx";
import * as countriesLib from "i18n-iso-countries";
import enLocale from 'i18n-iso-countries/langs/en.json';
import ruLocale from 'i18n-iso-countries/langs/ru.json';
import {useAvailableCountries} from "@/shared/queries/useAvailableCountries.tsx";
import {useNavigate} from "react-router-dom";

countriesLib.registerLocale(enLocale);
countriesLib.registerLocale(ruLocale);

const Countries: FC = () => {
    const navigate = useNavigate();
    const {data: countriesData, error: countriesError, isLoading: countriesLoading} = useAvailableCountries();

    const countryCodes: string[] = countriesData?.map(c => c.code) || [];
    const countriesWithNames = countryCodes.map(code => ({
        code: code,
        name: countriesLib.getName(code, 'ru') || code // 'ru' для русского, можно 'en' для английского
    }));


    if (countriesError) {
        return <div className="text-center py-10 text-[var(--color-red)]">
            Ошибка загрузки стран: {countriesError.message}
        </div>;
    }

    const handleCountrySelect = (countryCode: string) => {
        navigate(`/${countryCode}`);
    };

    return(
        <section className="px-[var(--page-inline-padding)] max-w-[1240px] mx-auto">
            <SectionHeader text="Доступные страны"/>
            {countriesLoading ? (
                <SkeletonLoader isLoading={true} height="200px" className="my-4"/>
            ) : (
                <CountryTabs
                    countries={countriesWithNames}
                    onSelect={handleCountrySelect}
                />
            )}
        </section>
    )
}

export default Countries;
