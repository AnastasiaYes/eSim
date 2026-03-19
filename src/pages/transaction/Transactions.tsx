import {type FC, useState} from "react";
import {SectionHeader} from "@/shared/ui/SectionHeader/SectionHeader.tsx";
import {SearchInputSimple} from "@/shared/ui/SearchInputSimple/SearchInputSimple.tsx";


const Transaction: FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <section className="px-[var(--page-inline-padding)] max-w-[1240px] mx-auto">
          <SectionHeader text="Tранзакции"/>

            <SearchInputSimple value={searchQuery} onChange={setSearchQuery} />
        </section>
    )
}

export default Transaction;
