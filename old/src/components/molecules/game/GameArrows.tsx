import classNames from 'classnames';
import {FC} from 'react';
import {
    FaChevronDown,
    FaChevronLeft,
    FaChevronRight,
    FaChevronUp
} from 'react-icons/fa';
import {GameDrop} from '../../atoms/game/GameDrop';
import {GameMove} from '../../atoms/game/GameMove';
import {ClassNameProps} from '../../particles/particles.types';
import {UiButtonShape} from '../../particles/ui/UiButton';

export interface GameArrowsProps {
    disabled?: boolean;

    hardDrop: string;

    left: string;

    onHardDrop: () => void;

    onLeft: () => void;

    onRight: () => void;

    onSoftDrop: (fast: boolean) => void;

    right: string;

    softDrop: string;

    speed?: number;
}

export const GameArrows: FC<GameArrowsProps & ClassNameProps> = ({
    disabled,
    hardDrop,
    left,
    right,
    softDrop,
    onHardDrop,
    onLeft,
    onRight,
    onSoftDrop,
    speed = 500,
    className
}) => {
    return (
        <div className={classNames(className, 'grid grid-cols-3 gap-1')}>
            <GameDrop
                className="col-start-2"
                disabled={disabled}
                icon={<FaChevronUp />}
                keyCode={hardDrop}
                onDrop={(enable) => {
                    enable && onHardDrop();
                }}
                shape={UiButtonShape.UP}
            />
            <GameMove
                className="col-start-1"
                disabled={disabled}
                icon={<FaChevronLeft />}
                keyCode={left}
                onMove={onLeft}
                speed={speed}
                shape={UiButtonShape.LEFT}
            />
            <GameMove
                className="col-start-3"
                disabled={disabled}
                icon={<FaChevronRight />}
                keyCode={right}
                onMove={onRight}
                speed={speed}
                shape={UiButtonShape.RIGHT}
            />
            <GameDrop
                className="col-start-2"
                disabled={disabled}
                icon={<FaChevronDown />}
                keyCode={softDrop}
                onDrop={onSoftDrop}
                shape={UiButtonShape.DOWN}
            />
        </div>
    );
};
