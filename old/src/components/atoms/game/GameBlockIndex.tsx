import {FC} from 'react';
import {useSelector} from 'react-redux';
import {GameSelectors} from '../../../store/game/game-selectors';
import {GameBlock} from './GameBlock';

export interface GameBlockIndexProps {
    indx: number;
}

export const GameBlockIndex: FC<GameBlockIndexProps> = ({indx}) => {
    const cell = useSelector(GameSelectors.screenCell(indx));
    const speed = useSelector(GameSelectors.speed);
    return cell ? (
        <GameBlock
            type={cell.type}
            glow={cell.glow}
            ghost={cell.ghost}
            speed={speed}
            grid={true}
        />
    ) : null;
};
