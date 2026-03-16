import type {FC} from "react";
import "./EsimPlanCard.scss"

type EsimPlanCardProps = {
    id: string;
    name: string;
    description: string;
    img: string;
    cost: number;
    currency: string;
    onClick?: (id: string) => void;
    disabled?: boolean;
};


export const EsimPlanCard: FC<EsimPlanCardProps> = ({
                                                        id,
                                                        name,
                                                        description,
                                                        img,
                                                        cost,
                                                        currency,
                                                        disabled = false,
                                                        onClick
                                                    }) => {
    const handleClick = () => {
        if (!disabled && onClick) {
            onClick(id);
        }
    };

    return (
        <div
            onClick={handleClick}
            className={`card ${disabled ? "disabled" : ""}`}
        >
            <img src={img} alt={name}  />
            <div className="card-content">
                <h3 >{name}</h3>
                <p >{description}</p>
                <span >
          From {new Intl.NumberFormat("en-US", { style: "currency", currency }).format(cost)}
        </span>
            </div>
        </div>
    );
};
