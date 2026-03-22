import type {FC} from "react";
import {SectionHeader} from "@/shared/ui/SectionHeader/SectionHeader.tsx";
import {Button} from "@/shared/ui/Button/Button.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEsimDetail} from "@/shared/queries/useEsimDetail.tsx";
import * as countriesLib from "i18n-iso-countries";
import enLocale from 'i18n-iso-countries/langs/en.json';
import ruLocale from 'i18n-iso-countries/langs/ru.json';
import {SkeletonLoader} from "@/shared/ui/SkeletonLoader/SkeletonLoader.tsx";
import {InfoRow} from "@/shared/ui/InfoRow/InfoRow.tsx";
import {Notes} from "@/shared/ui/Notes/Notes.tsx";

countriesLib.registerLocale(enLocale);
countriesLib.registerLocale(ruLocale);

const TariffDetails: FC = () => {
    const navigate = useNavigate();

    const {id: countryCode, esimId} = useParams<{ id: string; esimId: string }>();
    const {data, isLoading, error} = useEsimDetail(esimId ? Number(esimId) : undefined);

    if (error) {
        return (
            <div className="text-center py-10 text-red-500">
                Ошибка загрузки деталей: {error.message}
            </div>
        );
    }

    if (isLoading) {
        return (
            <section className="px-[var(--page-inline-padding)] max-w-[1240px] mx-auto">
                <SectionHeader text="Тарифы" showBackButton={true} onBack={() => navigate(`/${countryCode}`)} />
                <div className="mt-6">
                    <SkeletonLoader isLoading={true} height="24px" className="my-4" />
                    <SkeletonLoader isLoading={true} height="400px" className="rounded-xl" />
                </div>
            </section>
        );
    }

    const plan = data?.catalogEsim;

    if (!plan) {
        return (
            <div className="text-center py-10">
                Тариф не найден
            </div>
        );
    }

    if (!countryCode || !esimId) {
        return <div>Некорректный URL</div>;
    }

    const countryName = countriesLib.getName(countryCode, 'ru') || countryCode.toUpperCase();
    const dataDisplay = plan.unlimited
        ? 'Безлимитный'
        : `${plan.dataQuantity} ${plan.dataUnit}`;
    const validityDisplay = `${plan.packageValidity} ${plan.packageValidityUnit}`;

    const statusElement = (
        <span className={`font-medium ${plan.isActive ? 'text-green-600' : 'text-red-500'}`}>
            {plan.isActive ? 'Доступен' : 'Недоступен'}
        </span>
    );

    return (
        <section className="px-[var(--page-inline-padding)] max-w-[1240px] mx-auto">
            <SectionHeader text="Тарифы" showBackButton={true} onBack={() => navigate(`/${countryCode}`)}/>
            <h2>{plan.name}</h2>

            {isLoading ? (
                <div>
                    <SkeletonLoader isLoading={true} height="17px" className="my-4"/>
                    <SkeletonLoader isLoading={true} height="174px"/>
                </div>
            ) : (
                <div>
                    <div className="space-y-3">
                        <InfoRow label="Страна" value={`${countryName} (${countryCode})`} />
                        <InfoRow label="Стоимость" value={`${plan.price} ${plan.currency}`} />
                        <InfoRow label="Трафик" value={dataDisplay} />
                        <InfoRow label="Срок действия" value={validityDisplay} />
                        {plan.packageType && <InfoRow label="Тип пакета" value={plan.packageType} />}
                        <InfoRow label="Статус" value={statusElement} />

                        <Notes />
                    </div>

                    <Button
                        variant="primary"
                        disabled={!plan.isActive}
                        onClick={() => console.log('Выбран тариф', plan.id)}
                        className="w-full"
                    >
                        {plan.isActive ? 'Выбрать тариф' : 'Недоступно'}
                    </Button>
                </div>
            )}
        </section>
    )
}

export default TariffDetails;

