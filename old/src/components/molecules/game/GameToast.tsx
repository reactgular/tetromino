import classNames from 'classnames';
import {FC} from 'react';
import {ClassNameProps} from '../../particles/particles.types';

export interface GameToastProps {
    message: string;
}

export const GameToast: FC<GameToastProps & ClassNameProps> = ({
    message,
    className
}) => {
    return (
        <div
            data-testid="game-toast"
            className={classNames(
                className,
                'flex font-mono items-center justify-center text-4xl'
            )}
        >
            {message}
        </div>
    );
};
