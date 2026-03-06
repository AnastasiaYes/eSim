import {CountryTabs} from "@/app/shared/ui/CountryTabs/CountryTabs.tsx";
import {EsimPlanCard} from "@/app/shared/ui/EsimPlanCard/EsimPlanCard.tsx";
import type {FC} from "react";
import {SectionHeader} from "@/app/shared/ui/SectionHeader/SectionHeader.tsx";

const Home: FC = () => {
    const countries = ["Армения", "Россия", "Грузия", "Беларусь"];
    const esimPlans = [
        {
            id: "1",
            name: "Mainland China 5G",
            description: "5G Data | 7 Days | Supports ChatGPT",
            img: "https://www.eastchinatrip.com/wp-content/uploads/eSIM.webp",
            cost: 5.99,
            currency: "USD"
        },
        {
            id: "2",
            name: "Taiwan eSIM",
            description: "4G/5G | 10 Days | Daily 2GB",
            img: "https://www.eastchinatrip.com/wp-content/uploads/eSIM.webp",
            cost: 4.5,
            currency: "USD"
        },
        {
            id: "3",
            name: "Hong Kong eSIM",
            description: "Unlimited Data | 3 Days",
            img: "https://www.eastchinatrip.com/wp-content/uploads/eSIM.webp",
            cost: 3.2,
            currency: "USD",
            disabled: true
        }
    ];
    return (
        <section className="px-[var(--page-inline-padding)] max-w-[1240px] mx-auto">
            <SectionHeader text="Купить eSim"/>
            <CountryTabs country={countries}/>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 max-w-[1240px] mx-auto">
                {esimPlans.map((plan) => (
                    <EsimPlanCard
                        key={plan.id}
                        {...plan}
                        onClick={(id) => console.log("Clicked:", id)}
                    />
                ))}
            </div>
        </section>
    )
}

export default Home;
