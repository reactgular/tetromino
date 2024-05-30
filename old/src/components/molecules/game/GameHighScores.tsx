import classNames from 'classnames';
import {FC, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {AppSelectors} from '../../../store/app/app-selectors';
import {ClassNameProps} from '../../particles/particles.types';
import {GameScore} from './GameScore';

export interface GameHighScoresProps {
    selectScores?: any;
}

export const GameHighScores: FC<GameHighScoresProps & ClassNameProps> = ({
    selectScores = AppSelectors.highScores,
    className
}) => {
    const highScores: Array<number> = useSelector(selectScores);
    const scores = useMemo(() => {
        return [...(highScores || []), ...Array(10).fill(0)].slice(0, 9);
    }, [highScores]);
    return (
        <div className={classNames(className, 'flex flex-col text-2xl')}>
            {scores.map((score, indx) => (
                <GameScore key={indx} rank={indx + 1} score={score} />
            ))}
        </div>
    );
};
