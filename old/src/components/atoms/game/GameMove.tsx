import classNames from 'classnames';
import {FC, ReactElement, useCallback, useEffect, useState} from 'react';
import {useUiTheme} from '../../particles/contexts/UiThemeContext';
import {KeyPressed} from '../../particles/nulls/KeyPressed';
import {Repeater} from '../../particles/nulls/Repeater';
import {ClassNameProps} from '../../particles/particles.types';
import {UiButton, UiButtonShape} from '../../particles/ui/UiButton';

const SKIP_SECOND_REPEAT = 1;

export interface GameMoveProps {
    disabled?: boolean;

    icon: ReactElement;

    keyCode: string;

    onMove: () => void;

    shape: UiButtonShape;

    speed?: number;
}

export const GameMove: FC<GameMoveProps & ClassNameProps> = ({
    disabled,
    icon,
    keyCode,
    onMove,
    speed = 500,
    shape,
    className
}) => {
    const [count, setCount] = useState(0);
    const [enable, setEnable] = useState(false);
    const {large} = useUiTheme();

    useEffect(() => {
        if (enable && count !== SKIP_SECOND_REPEAT) {
            onMove();
        }
    }, [enable, count, onMove]);

    const startRepeat = useCallback(() => {
        setEnable(true);
        setCount(0);
    }, []);
    const stopRepeat = useCallback(() => setEnable(false), []);

    return (
        <>
            <UiButton
                data-testid="game-move"
                className={classNames(
                    'items-center justify-center',
                    className,
                    {'p-4': !large, 'p-5': large}
                )}
                preventFocus={true}
                disabled={disabled}
                active={enable}
                shape={shape}
                onPress={() => startRepeat()}
                onRelease={() => stopRepeat()}
            >
                {icon}
            </UiButton>
            {!disabled && (
                <KeyPressed
                    keyCode={keyCode}
                    onPress={startRepeat}
                    onRelease={stopRepeat}
                />
            )}
            {!disabled && (
                <Repeater
                    onRepeat={() => setCount(count + 1)}
                    disabled={!enable}
                    speed={speed}
                />
            )}
        </>
    );
};
