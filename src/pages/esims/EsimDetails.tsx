import type {FC} from "react";
import {SectionHeader} from "@/shared/ui/SectionHeader/SectionHeader.tsx";

const EsimDetails: FC = () => {

    return(
        <section className="px-[var(--page-inline-padding)] max-w-[1240px] mx-auto">
            <SectionHeader text="EsimDetails"/>
        </section>
    )
}

export default EsimDetails;
