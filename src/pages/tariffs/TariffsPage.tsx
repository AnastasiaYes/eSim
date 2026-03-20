import {type FC, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAvailableCountries} from "@/shared/queries/useAvailableCountries.tsx";
import {useEsimCatalog} from "@/shared/queries/useEsimCatalog.tsx";
import {SectionHeader} from "@/shared/ui/SectionHeader/SectionHeader.tsx";
import {CountryTabs} from "@/shared/ui/CountryTabs/CountryTabs.tsx";
import {EsimPlanCard} from "@/shared/ui/EsimPlanCard/EsimPlanCard.tsx";
import type {CardCatalogEsimResponse} from "@/shared/api/api.ts";
import * as countriesLib from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import ruLocale from 'i18n-iso-countries/langs/ru.json';
import {Pagination} from "@/shared/ui/Pagination/Pagination.tsx";
import {SkeletonLoader} from "@/shared/ui/SkeletonLoader/SkeletonLoader.tsx";

countriesLib.registerLocale(enLocale);
countriesLib.registerLocale(ruLocale);

const TariffsPage: FC = () => {
    const navigate = useNavigate();
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);

    const {data: countriesData, error: countriesError, isLoading: countriesLoading} = useAvailableCountries();
    const {
        data: catalogData,
        error: catalogError,
        isLoading: catalogLoading,
        isFetching: catalogFetching
    } = useEsimCatalog(
        selectedCountry
            ? {country: selectedCountry, page: currentPage, quantity: 20}
            : {page: currentPage, quantity: 20}
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCountry]);

    if (countriesError) {
        return <div className="text-center py-10 text-[var(--color-red)]">
            Ошибка загрузки стран: {countriesError.message}
        </div>;
    }

    if (catalogError) {
        return <div className="text-center py-10 text-[var(--color-red)]">
            Ошибка загрузки тарифов: {catalogError.message}
        </div>;
    }

    const countryCodes: string[] = countriesData?.map(c => c.code) || [];

    // Создаем массив объектов с кодом и названием для CountryTabs
    const countriesWithNames = countryCodes.map(code => ({
        code: code,
        name: countriesLib.getName(code, 'ru') || code // 'ru' для русского, можно 'en' для английского
    }));

    const catalog = catalogData?.catalog || [];
    const totalTariffs = catalogData?.pagination?.totalQuantity || 0;
    const totalPages = catalogData?.pagination?.pages || 0;


    return (
        <section className="px-[var(--page-inline-padding)] max-w-[1240px] mx-auto">
            <SectionHeader text="Купить eSim"/>

            {catalogLoading && catalog.length === 0 ? (
                <SkeletonLoader isLoading={true} height="37px" className="my-4"/>
            ) : (
                <CountryTabs
                    countries={countriesWithNames}
                    onSelect={setSelectedCountry}
                />
            )}

            {catalogLoading ? (
                <div>
                    <SkeletonLoader isLoading={true} height="17px" className="my-4"/>
                    <SkeletonLoader isLoading={true} height="174px" />
                </div>
            ) : (
                <>
                    <div className="text-sm mb-4">
                        <span className="text-[var(--color-gray-500)]">Найдено тарифов: {totalTariffs}</span>
                        {catalog.length < totalTariffs && (
                            <span className="text-[var(--color-gray-400)] ml-2">
                    (показано {catalog.length} из {totalTariffs})</span>
                        )}
                    </div>

                    <div
                        className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 max-w-[1240px] mx-auto mt-6">
                        {catalog.map((plan: CardCatalogEsimResponse) => (
                            <EsimPlanCard
                                key={plan.id}
                                plan={plan}
                                onClick={(id: number) => navigate(`/esim/${id}`)}
                            />
                        ))}

                        {catalog.length === 0 && (
                            <div className="col-span-full text-center py-10 text-[var(--color-gray-500)] ">
                                {selectedCountry
                                    ? `Нет доступных тарифов для страны ${selectedCountry}`
                                    : "Выберите страну чтобы увидеть тарифы"}
                            </div>
                        )}
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </section>
    );
};

export default TariffsPage;
