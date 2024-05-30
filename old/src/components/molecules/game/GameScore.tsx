import classNames from 'classnames';
import {FC} from 'react';
import {GameDigits} from '../../atoms/game/GameDigits';
import {ClassNameProps} from '../../particles/particles.types';

export interface GameScoreProps {
    rank: number;

    score: number;
}

export const GameScore: FC<GameScoreProps & ClassNameProps> = ({
    rank,
    score,
    className
}) => {
    return (
        <div
            className={classNames(
                className,
                'flex font-mono items-baseline space-x-4'
            )}
        >
            <div className="text-light">#{rank}</div>
            <GameDigits digits={6} value={score} />
        </div>
    );
};
