import {type FC, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useEsimCatalog} from "@/shared/queries/useEsimCatalog.tsx";
import {SectionHeader} from "@/shared/ui/SectionHeader/SectionHeader.tsx";
import {EsimPlanCard} from "@/shared/ui/EsimPlanCard/EsimPlanCard.tsx";
import type {CardCatalogEsimResponse} from "@/shared/api/api.ts";
import {Pagination} from "@/shared/ui/Pagination/Pagination.tsx";
import {SkeletonLoader} from "@/shared/ui/SkeletonLoader/SkeletonLoader.tsx";
import * as countriesLib from "i18n-iso-countries";
import enLocale from 'i18n-iso-countries/langs/en.json';
import ruLocale from 'i18n-iso-countries/langs/ru.json';

countriesLib.registerLocale(enLocale);
countriesLib.registerLocale(ruLocale);

const TariffsPage: FC = () => {
    const navigate = useNavigate();
    const { id: countryCode } = useParams<{ id: string }>();
    const [currentPage, setCurrentPage] = useState<number>(1);

    const {
        data: catalogData,
        error: catalogError,
        isLoading: catalogLoading,
    } = useEsimCatalog(
        countryCode
            ? {country: countryCode, page: currentPage, quantity: 20}
            : {page: currentPage, quantity: 20}
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    useEffect(() => {
        if (!countryCode) {
            navigate('/');
        }
    }, [countryCode, navigate]);

    if (catalogError) {
        return <div className="text-center py-10 text-[var(--color-red)]">
            Ошибка загрузки тарифов: {catalogError.message}
        </div>;
    }

    const catalog = catalogData?.catalog || [];
    const totalTariffs = catalogData?.pagination?.totalQuantity || 0;
    const totalPages = catalogData?.pagination?.pages || 0;

    const getCountryName = (code: string): string => {
        if (!code) return '';
        const name = countriesLib.getName(code, 'ru');
        return name || code.toUpperCase();
    };

    if (!countryCode) {
        return null;
    }

    const countryName = countryCode ? getCountryName(countryCode) : '';

    return (
        <section className="px-[var(--page-inline-padding)] max-w-[1240px] mx-auto">
            <SectionHeader text={countryName} showBackButton={true} onBack={() => navigate('/')}/>
            <h2>Выберите тариф для eSim"</h2>

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
                                onClick={(id: number) => navigate(`/${countryCode}/esim/${id}`)}
                            />
                        ))}

                        {catalog.length === 0 && !catalogLoading && (
                            <div className="col-span-full text-center py-10 text-gray-500">
                                Нет доступных тарифов для страны {countryName}
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
