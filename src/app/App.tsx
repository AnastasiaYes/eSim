import { Routes, Route } from "react-router-dom";
import { Header } from "@/app/shared/ui/Header/Header.tsx";
import Home from "@/pages/Home.tsx";
import MyEsims from "@/pages/MyEsims.tsx";
import Transaction from "@/pages/Transactions.tsx";

export const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/my-esims" element={<MyEsims />} />
                <Route path="/transaction" element={<Transaction />} />
            </Routes>
        </>
    );
};
