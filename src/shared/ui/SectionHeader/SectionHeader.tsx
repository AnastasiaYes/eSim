import arrow from "@/assets/icon/arrow.svg"

type SectionHeaderProps = {
    text: string;
    showBackButton?: boolean;
    onBack?: () => void;
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({
                                                                text,
                                                                showBackButton = false,
                                                                onBack
                                                            }) => {
    return (
        <div className="flex items-center gap-2">
            {showBackButton && (
                <button
                    onClick={onBack}
                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <img src={arrow} alt="back" className="rotate-180" width={10} height={14}  />
                </button>
            )}
            <h1>{text}</h1>
        </div>
    );
};
