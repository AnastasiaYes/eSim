type SectionHeaderProps = {
    text: string;
    linkTo?: string;
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({ text }) => {
    return (
        <div className="flex items-center justify-between">
            <h1>{text}</h1>
        </div>
    );
};
