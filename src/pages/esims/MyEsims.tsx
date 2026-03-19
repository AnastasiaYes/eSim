import type {FC} from "react";
import {useNavigate} from "react-router-dom";
import {type EsimPlan, PurchasedPlanEsimCard} from "@/shared/ui/PurchasedPlanEsimCard/PurchasedPlanEsimCard.tsx";
import {SectionHeader} from "@/shared/ui/SectionHeader/SectionHeader.tsx";

const MyEsims: FC = () => {
    const navigate = useNavigate();

    const goToDetails = (plan: EsimPlan) => {
        navigate(`/my-esims/${plan.id}`);
    };

    const myPlans = [
        {  id: "1", name: "Plan A", status: "active", balance: 15, currency: "USD", cards: 1 },
        {  id: "2", name: "Plan B", status: "inactive", balance: 0, currency: "EUR", cards: 2 },
    ];

    return(
        <section className="px-[var(--page-inline-padding)] max-w-[1240px] mx-auto">
            <SectionHeader text="Мои eSim"/>
            <PurchasedPlanEsimCard plans={myPlans}  goToDetails={goToDetails} />
        </section>
    )
}

export default MyEsims;


