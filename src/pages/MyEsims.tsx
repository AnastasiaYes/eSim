import type {FC} from "react";
import {type EsimPlan, PurchasedPlanEsimCard} from "@/app/shared/ui/PurchasedPlanEsimCard/PurchasedPlanEsimCard.tsx";
import {SectionHeader} from "@/app/shared/ui/SectionHeader/SectionHeader.tsx";

const MyEsims: FC = () => {
    const myPlans = [
        { name: "Plan A", status: "active", balance: 15, currency: "USD", cards: 1 },
        { name: "Plan B", status: "inactive", balance: 0, currency: "EUR", cards: 2 },
    ];

    const handleClick = (plan: EsimPlan) => {
        alert(`Переход к деталям ${plan.name}`);
    };

    return(
        <section className="px-[var(--page-inline-padding)] max-w-[1240px] mx-auto">
            <SectionHeader text="Мои eSim"/>
            <PurchasedPlanEsimCard plans={myPlans}  goToDetails={handleClick} />
        </section>
    )
}

export default MyEsims;


