import type { FC } from "react";
import {statusClasses} from "@/app/styles/statusClasses.ts";
import iconSim from "@/assets/icon/sim.png"

export interface EsimPlan {
    name: string;
    status: string;
    balance?: number;
    currency: string;
    cards: number;
}

interface PurchasedPlanEsimCardProps {
    plans: EsimPlan[];
    goToDetails: (plan: EsimPlan) => void;
}

export const PurchasedPlanEsimCard: FC<PurchasedPlanEsimCardProps> = ({
                                                                          plans,
                                                                          goToDetails,
                                                                      }) => {
    return (
        <div className="flex flex-col gap-4">
            {plans.map((plan, idx) => (
                <div
                    key={idx}
                    className="account-card bg-gray-50 py-6 px-5 rounded-2xl border border-gray-200 cursor-pointer"
                    onClick={() => goToDetails(plan)}
                >
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-200">
                            <img src={iconSim} alt="icon" width={25}/>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-medium text-lg">{plan.name}</h3>
                            <p className={statusClasses[plan.status]}>
                                {plan.status === "active" ? "Active" : "Inactive"}
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <div>
                            <span className="font-semibold">{plan.balance?.toFixed(2) || 0}</span>{" "}
                            <span>{plan.currency}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
