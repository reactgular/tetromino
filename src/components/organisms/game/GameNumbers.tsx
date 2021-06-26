import classNames from 'classnames';
import {VFC} from 'react';
import {useSelector} from 'react-redux';
import {GameSelectors} from '../../../store/game/game-selectors';
import {GameNumber} from '../../molecules/game/GameNumber';
import {ClassNameProps} from '../../particles/particles.types';

export const GameNumbers: VFC<ClassNameProps> = ({className}) => {
    const score = useSelector(GameSelectors.score);
    const level = useSelector(GameSelectors.level);
    const lines = useSelector(GameSelectors.lines);

    return (
        <div className={classNames(className, 'flex')}>
            <GameNumber label="Score" value={score} />
            <GameNumber label="Level" value={level} primary={false} />
            <GameNumber label="Lines" value={lines} primary={false} />
        </div>
    );
};
