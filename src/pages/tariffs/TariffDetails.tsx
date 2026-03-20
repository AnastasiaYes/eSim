import type {FC} from "react";
import {SectionHeader} from "@/shared/ui/SectionHeader/SectionHeader.tsx";
import {Button} from "@/shared/ui/Button/Button.tsx";

const TariffDetails: FC = () => {

    return(
        <section className="px-[var(--page-inline-padding)] max-w-[1240px] mx-auto">
            <SectionHeader text="Дитали тарифа"/>

            <div>
                <h3></h3>

                <div>

                </div>

                <Button>Выбрать тариф</Button>
            </div>

        </section>
    )
}

export default TariffDetails;

