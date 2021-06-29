import classNames from 'classnames';
import {VFC} from 'react';
import {useSelector} from 'react-redux';
import {GameSelectors} from '../../../store/game/game-selectors';
import {GameNumber} from '../../molecules/game/GameNumber';
import {ClassNameProps} from '../../particles/particles.types';

export interface GameNumbersProps {
    reverse?: boolean;
}

export const GameNumbers: VFC<GameNumbersProps & ClassNameProps> = ({
    reverse = false,
    className
}) => {
    const score = useSelector(GameSelectors.score);
    const level = useSelector(GameSelectors.level);
    const lines = useSelector(GameSelectors.lines);

    return (
        <div className={classNames(className, 'flex')}>
            <GameNumber label="Score" value={score} reverse={reverse} />
            <GameNumber
                label="Level"
                value={level}
                reverse={reverse}
                primary={false}
            />
            <GameNumber
                label="Lines"
                value={lines}
                reverse={reverse}
                primary={false}
            />
        </div>
    );
};
