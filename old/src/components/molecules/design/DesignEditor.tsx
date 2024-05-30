import classNames from 'classnames';
import {FC, useCallback, useMemo, useState} from 'react';
import {GamePiece} from '../../../engine/game-player';
import {DesignCell} from '../../atoms/design/DesignCell';
import {ClassNameProps} from '../../particles/particles.types';
import {UiButton} from '../../particles/ui/UiButton';

export interface DesignEditorProps {
    center?: [number, number];

    onCreate: (piece: GamePiece) => void;

    size?: number;
}

export const DesignEditor: FC<DesignEditorProps & ClassNameProps> = ({
    center = [2, 1],
    size = 4,
    onCreate,
    className
}) => {
    const [values, setValues] = useState(() => Array(size * size).fill(null));

    const cells = useMemo(() => {
        const [center_x, center_y] = center;

        function* generateLayout() {
            for (let y = 0; y < size + 1; y++) {
                for (let x = 0; x < size + 1; x++) {
                    const key = `${x}:${y}`;
                    const value_indx = y * size + (x - 1);
                    if (x === 0 && y === size) {
                        yield <div key={key} />;
                    } else if (x === 0) {
                        yield (
                            <div
                                key={key}
                                className="text-gray-400 flex items-center justify-center"
                            >
                                {y - center_y}
                            </div>
                        );
                    } else if (y === size) {
                        yield (
                            <div
                                key={key}
                                className="text-gray-400 flex items-center justify-center"
                            >
                                {x - center_x - 1}
                            </div>
                        );
                    } else {
                        yield (
                            <DesignCell
                                className={classNames('border-r border-b', {
                                    'border-t': y === 0,
                                    'border-l': x === 1
                                })}
                                key={key}
                                value={Boolean(values[value_indx])}
                                center={x - 1 === center_x && y === center_y}
                                onChange={(v) => {
                                    const newValues = values.slice();
                                    newValues[value_indx] = v
                                        ? {x: x - center_x - 1, y: y - center_y}
                                        : null;
                                    setValues(newValues);
                                }}
                            />
                        );
                    }
                }
            }
        }

        return Array.from(generateLayout());
    }, [size, center, values, setValues]);

    const isEmpty = useMemo(() => {
        return values.filter(Boolean).length === 0;
    }, [values]);

    const create = useCallback(() => {
        onCreate(values.filter(Boolean).map(({x, y}) => [x, y]));
        setValues(Array(size * size).fill(null));
    }, [values, onCreate, setValues, size]);

    return (
        <div
            className={classNames(`grid`, className)}
            style={{gridTemplateColumns: `repeat(${size + 1}, minmax(0, 1fr))`}}
        >
            {cells.map((cell) => cell)}
            <UiButton
                className="mt-3"
                style={{gridColumn: `2 / ${size + 2}`}}
                onClick={create}
                disabled={isEmpty}
            >
                Create
            </UiButton>
        </div>
    );
};
