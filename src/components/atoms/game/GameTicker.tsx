import {FC} from 'react';
import {useSelector} from 'react-redux';
import {GameSelectors} from '../../../store/game/game-selectors';
import {useInterval} from '../../particles/hooks/useInterval';

export interface GameTickerProps {
    onTick: () => void;

    speed: number;
}

export const GameTicker: FC<GameTickerProps> = ({speed, onTick}) => {
    useInterval(() => onTick(), speed, [speed, onTick]);
    return null;
};
