import {useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {environment} from '../../../environment/environment';
import {GameStatus} from '../../../store/game/game-model';
import {GameSelectors} from '../../../store/game/game-selectors';

const STATUS_TITLE = {
    [GameStatus.WELCOME]: 'Welcome',
    [GameStatus.STARTING]: 'Starting',
    [GameStatus.RUNNING]: 'Playing',
    [GameStatus.PAUSED]: 'Paused',
    [GameStatus.FINISHING]: 'Game Over',
    [GameStatus.FINISHED]: 'Game Over'
};

/**
 * @deprecated use NextJs metadata instead
 */
export const useTitle = () => {
    const status = useSelector(GameSelectors.status);
    const title = useMemo(
        () => `${STATUS_TITLE[status]} | ${environment.brandName}`,
        [status]
    );
    useEffect(() => {
        document.title = title;
    }, [title]);
};
