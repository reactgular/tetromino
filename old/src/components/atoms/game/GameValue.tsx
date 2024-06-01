import classNames from 'classnames';
import {FC} from 'react';
import {useUiTheme} from '../../particles/contexts/UiThemeContext';
import {ClassNameProps} from '../../particles/particles.types';

export interface GameValueProps {
    label: string;

    reverse?: boolean;
}

export const GameValue: FC<GameValueProps & ClassNameProps> = ({
    label,
    reverse = false,
    className,
    children
}) => {
    const {transparent} = useUiTheme();
    return (
        <div
            className={classNames(className, 'flex items-center w-full', {
                'flex-col': !reverse,
                'flex-col-reverse': reverse
            })}
        >
            <div className="flex text-light mb-1">{label}</div>
            <div
                className={classNames('flex w-full flex-col rounded-lg', {
                    'border border-gray-200 dark:border-gray-600': transparent,
                    'dark:nm-inset-gray-800 nm-inset-gray-100': !transparent
                })}
            >
                {children}
            </div>
        </div>
    );
};
