import classNames from 'classnames';
import {FC, useEffect, useState} from 'react';
import {ClassNameProps} from '../../particles/particles.types';

export interface GameTimerProps {
    count?: number;

    onStart: () => void;
}

export const GameTimer: FC<GameTimerProps & ClassNameProps> = ({
    count,
    onStart,
    className
}) => {
    const [counter, setCounter] = useState(() => count as number);

    useEffect(() => {
        if (counter > 0) {
            const id = setInterval(() => setCounter(counter - 1), 1000);
            return () => clearInterval(id);
        } else if (counter === 0) {
            onStart();
        }
    }, [counter, onStart]);

    return (
        <div
            data-testid="game-timer"
            className={classNames(
                className,
                'flex font-mono items-center justify-center text-9xl'
            )}
        >
            {counter > 0 ? counter : ''}
        </div>
    );
};

GameTimer.defaultProps = {
    count: 3
};
