import type { FC,  ReactNode } from 'react';
import clsx from 'clsx';

type InfoRowProps = {
    label: string;
    value: ReactNode;
    className?: string;
};

export const InfoRow: FC<InfoRowProps> = ({ label, value, className }) => {
    return (
        <div className={clsx('flex items-center gap-2 border-b pb-2', className)}>
            <span className="text-[var(--color-gray-500)] w-32">{label}:</span>
            <span className="font-medium">{value}</span>
        </div>
    );
};
