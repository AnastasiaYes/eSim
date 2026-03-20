import {type FC } from 'react';
import clsx from 'clsx';
import "./SkeletonLoader.scss";

interface SkeletonLoaderProps {
    isLoading: boolean;
    width?: string;
    height?: string;
    className?: string;
}

export const SkeletonLoader: FC<SkeletonLoaderProps> = ({
                                                            isLoading,
                                                            width = '100%',
                                                            height = '220px',
                                                            className = ''
                                                        }) => {
    if (!isLoading) return null;

    return (
        <div
            className={clsx(
                'relative overflow-hidden rounded-lg bg-gray-75 animate-pulse',
                className
            )}
            style={{ width, height }}
        >
            <div
                className="absolute inset-0 bg-gradient-to-r from-gray-75 via-gray-100 to-gray-200 animate-[shimmer_1.5s_infinite]"
                style={{ transform: 'translateX(-100%)' }}
            />
        </div>
    );
};
