import classNames from 'classnames';
import {FC} from 'react';
import {ClassNameProps} from '../../particles/particles.types';

export interface DesignCellProps {
    center?: boolean;

    onChange: (value: boolean) => void;

    value: boolean;
}

export const DesignCell: FC<DesignCellProps & ClassNameProps> = ({
    center,
    value,
    onChange,
    className
}) => {
    return (
        <div
            className={classNames(
                'flex items-center justify-center',
                'border-r border-b w-8 h-8 cursor-pointer',
                'dark:bg-gray-500 bg-white',
                className,
                {
                    'dark:bg-gray-700 bg-gray-400': value
                }
            )}
            onClick={() => onChange(!value)}
        >
            {center ? (
                <div className="rounded-full dark:bg-gray-900 bg-gray-600 w-3 h-3" />
            ) : undefined}
        </div>
    );
};
