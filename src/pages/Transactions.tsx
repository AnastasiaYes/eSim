import type {FC} from "react";
import {SectionHeader} from "@/app/shared/ui/SectionHeader/SectionHeader.tsx";

const Transaction: FC = () => {
    return (
        <section className="px-[var(--page-inline-padding)] max-w-[1240px] mx-auto">
          <SectionHeader text="Tранзакции"/>
        </section>
    )
}

export default Transaction;
