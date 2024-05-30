import {FC, useEffect} from 'react';

export interface RepeaterProps {
    disabled?: boolean;

    emitFirst?: boolean;

    onRepeat: () => void;

    speed: number;
}

export const Repeater: FC<RepeaterProps> = ({
    emitFirst,
    disabled,
    onRepeat,
    speed
}) => {
    useEffect(() => {
        if (!disabled) {
            emitFirst && onRepeat();
            if (speed > 0) {
                const id = setInterval(() => onRepeat(), speed);
                return () => clearInterval(id);
            }
        }
    }, [emitFirst, disabled, onRepeat, speed]);
    return null;
};
