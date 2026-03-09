import { Routes, Route } from "react-router-dom";
import { Header } from "@/app/shared/ui/Header/Header.tsx";
import TariffsPage from "@/pages/tariffs/TariffsPage.tsx";
import MyEsims from "@/pages/esims/MyEsims.tsx";
import Transaction from "@/pages/transaction/Transactions.tsx";
import EsimDetails from "@/pages/esims/EsimDetails.tsx";
import TariffDetails from "@/pages/tariffs/TariffDetails.tsx";

export const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<TariffsPage />} />
                <Route path="/:id" element={<TariffDetails />} />
                <Route path="/my-esims" element={<MyEsims />} />
                <Route path="/my-esims/:id" element={<EsimDetails />} />
                <Route path="/transaction" element={<Transaction />} />
            </Routes>
        </>
    );
};
