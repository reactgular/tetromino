import classNames from 'classnames';
import {FC, useMemo} from 'react';
import {GamePiece} from '../../../engine/game-player';
import {TetrominosType} from '../../../engine/game-tetrominos';
import {GameBlock} from '../../atoms/game/GameBlock';
import {ClassNameProps} from '../../particles/particles.types';

export interface DesignDisplayProps {
    center?: [number, number];

    count?: number;

    grid?: boolean;

    type?: TetrominosType;

    values?: GamePiece;
}

export const DesignDisplay: FC<DesignDisplayProps & ClassNameProps> = ({
    center = [2, 1],
    grid = true,
    count = 4,
    type = TetrominosType.Z,
    values,
    className
}) => {
    const blocks = useMemo(() => {
        const [center_x, center_y] = center;
        const grid = Array(count * count).fill(undefined);
        values?.forEach(
            ([x, y]) =>
                (grid[y * count + x + center_x + center_y * count] = type)
        );
        return grid;
    }, [count, center, type, values]);

    return (
        <div
            className={classNames(className, 'grid w-full min-w-full', {
                'game-grid': grid
            })}
            style={{gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))`}}
        >
            {blocks.map((blockType, indx) => (
                <GameBlock key={indx} type={blockType} grid={grid} />
            ))}
        </div>
    );
};
