import {type FC, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {useAvailableCountries} from "@/shared/queries/useAvailableCountries.tsx";
import {useEsimCatalog} from "@/shared/queries/useEsimCatalog.tsx";
import {SectionHeader} from "@/shared/ui/SectionHeader/SectionHeader.tsx";
import {CountryTabs} from "@/shared/ui/CountryTabs/CountryTabs.tsx";
import {EsimPlanCard} from "@/shared/ui/EsimPlanCard/EsimPlanCard.tsx";
import type {CardCatalogEsimResponse} from "@/shared/api/api.ts";

const TariffsPage: FC = () => {
    const navigate = useNavigate();
    const [selectedCountry, setSelectedCountry] = useState<string>('');

    const { data: countries, error: countriesError, isLoading: countriesLoading } = useAvailableCountries();
    const {
        data: catalogData,
        error: catalogError,
        isLoading: catalogLoading,
        isFetching: catalogFetching
    } = useEsimCatalog(selectedCountry ? { country: selectedCountry, page: 1, quantity: 20 } : { page: 1, quantity: 20 });


    if (countriesLoading) {
        return <div className="text-center py-10">Загрузка стран...</div>;
    }

    if (countriesError) {
        return <div className="text-center py-10 text-red-500">
            Ошибка загрузки стран: {countriesError.message}
        </div>;
    }

    if (catalogError) {
        return <div className="text-center py-10 text-red-500">
            Ошибка загрузки тарифов: {catalogError.message}
        </div>;
    }

    // Проверяем длину массива стран
    const countryCodes: string[] = countries?.map(c => c.code) || [];

    // Проверяем каталог
    const catalog = catalogData?.catalog || [];

    // Если страны пустые, показываем специальное сообщение
    if (countryCodes.length === 0) {
        return (
            <section className="px-[var(--page-inline-padding)] max-w-[1240px] mx-auto py-8">
                <SectionHeader text="Купить eSim" />
                <div className="text-center py-10 text-gray-500">
                    <p className="text-lg mb-2">Нет доступных стран</p>
                    <p className="text-sm">В данный момент нет активных eSIM в каталоге</p>
                </div>
            </section>
        );
    }

    return (
        <section className="px-[var(--page-inline-padding)] max-w-[1240px] mx-auto py-8">
            <SectionHeader text="Купить eSim" />

            {countryCodes.length > 0 && (
                <CountryTabs
                    countries={countryCodes}
                    onSelect={setSelectedCountry}
                />
            )}

            {catalogFetching && catalog.length > 0 && (
                <div className="text-center text-sm text-gray-500 py-2">
                    Обновление тарифов...
                </div>
            )}

            {catalogLoading && catalog.length === 0 ? (
                <div className="text-center py-10">Загрузка тарифов...</div>
            ) : (
                <>
                    <div className="text-sm text-gray-500 mb-4">
                        Найдено тарифов: {catalog.length}
                    </div>

                    <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 max-w-[1240px] mx-auto mt-6">
                        {catalog.map((plan: CardCatalogEsimResponse) => (
                            <EsimPlanCard
                                key={plan.id}
                                plan={plan}
                                onClick={(id: number) => navigate(`/esim/${id}`)}
                            />
                        ))}

                        {catalog.length === 0 && (
                            <div className="col-span-full text-center py-10 text-gray-500">
                                {selectedCountry
                                    ? `Нет доступных тарифов для страны ${selectedCountry}`
                                    : "Выберите страну чтобы увидеть тарифы"}
                            </div>
                        )}
                    </div>
                </>
            )}
        </section>
    );
};

export default TariffsPage;
