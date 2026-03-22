import { type FC } from 'react';

export const Notes: FC = () => {
    return (
        <ul className="list-disc pl-5 text-xs text-[var(--color-gray-500)] space-y-1 my-6">
            <li>eSim will be activated when first byte of data is consumed</li>
            <li>
                Note: eSIM purchases are not eligible for a refund after 60 days from the purchase date,
                regardless of whether the eSIM has been installed or not.
            </li>
        </ul>
    );
};
