import type {FC} from "react";
import type {CardCatalogEsimResponse} from "@/shared/api/api.ts";

type EsimPlanCardProps = {
    plan: CardCatalogEsimResponse; // Используем точный тип из свагера
    onClick?: (id: number) => void; // id теперь number, не string
};

export const EsimPlanCard: FC<EsimPlanCardProps> = ({ plan, onClick }) => {
    const handleClick = () => {
        if (onClick) {
            onClick(plan.id);
        }
    };

    // Форматируем данные из плана для отображения
    const price = plan.price; // теперь это просто number
    const currency = plan.currency; // теперь это string

    // В свагере нет поля images/image, используем заглушку
    const imageUrl = 'https://www.eastchinatrip.com/wp-content/uploads/eSIM.webp';

    const isAvailable = plan.isActive; // используем isActive из свагера

    // Форматируем количество данных
    const dataDisplay = plan.unlimited
        ? 'Безлимитный'
        : `${plan.dataQuantity} ${plan.dataUnit}`;

    // Форматируем срок действия
    const validityDisplay = `${plan.packageValidity} ${plan.packageValidityUnit}`;

    return (
        <div
            onClick={handleClick}
            className={`
                relative bg-white rounded-xl shadow-md overflow-hidden 
                transition-all duration-300 
                ${onClick ? 'cursor-pointer hover:shadow-lg hover:scale-[1.02]' : ''}
                ${!isAvailable ? 'opacity-50' : ''}
                border border-gray-100
            `}
        >
            <div className="h-48 overflow-hidden bg-gray-50">
                <img
                    src={imageUrl}
                    alt={plan.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/300x200?text=eSIM";
                    }}
                />
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {plan.name}
                </h3>

                {plan.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {plan.description}
                    </p>
                )}

                {/* Информация о пакете */}
                <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
                        📱 {dataDisplay}
                    </span>
                    <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">
                        ⏱ {validityDisplay}
                    </span>
                    {plan.packageType && (
                        <span className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded-full">
                            {plan.packageType}
                        </span>
                    )}
                </div>

                {/* Цена */}
                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-blue-600">
                        {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency,
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }).format(price)}
                    </span>
                    {!isAvailable && (
                        <span className="text-xs text-gray-400">
                            Недоступно
                        </span>
                    )}
                </div>

                {/* Код страны */}
                <div className="mt-2 text-xs text-gray-400">
                    Код: {plan.countryCode}
                </div>
            </div>
        </div>
    );
};
