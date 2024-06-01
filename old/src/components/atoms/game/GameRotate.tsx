import classNames from 'classnames';
import {FC, useMemo, useState} from 'react';
import {BiRotateLeft, BiRotateRight} from 'react-icons/bi';
import {useUiTheme} from '../../particles/contexts/UiThemeContext';
import {KeyPressed} from '../../particles/nulls/KeyPressed';
import {ClassNameProps} from '../../particles/particles.types';
import {UiButton, UiButtonShape} from '../../particles/ui/UiButton';

export interface GameRotateProps {
    disabled?: boolean;

    keyCodeLeft: string;

    keyCodeRight: string;

    onRotateLeft: () => void;

    onRotateRight: () => void;
}

export const GameRotate: FC<GameRotateProps & ClassNameProps> = ({
    disabled,
    keyCodeLeft,
    keyCodeRight,
    onRotateLeft,
    onRotateRight,
    className
}) => {
    const [left, setLeft] = useState(false);
    const [right, setRight] = useState(false);
    const {large} = useUiTheme();

    const btnClass = useMemo(
        () =>
            classNames(className, 'flex text-lg items-center justify-center', {
                'w-14 h-14': !large,
                'w-16 h-16': large
            }),
        [className, large]
    );

    return (
        <div className="flex gap-4 my-auto">
            <UiButton
                data-testid="game-rotate-left"
                className={btnClass}
                preventFocus={true}
                disabled={disabled}
                active={left}
                shape={UiButtonShape.LEFT}
                onPress={onRotateLeft}
            >
                <BiRotateLeft />
            </UiButton>
            <UiButton
                data-testid="game-rotate-right"
                className={btnClass}
                preventFocus={true}
                disabled={disabled}
                active={right}
                shape={UiButtonShape.RIGHT}
                onPress={onRotateRight}
            >
                <BiRotateRight />
            </UiButton>
            {!disabled && (
                <KeyPressed
                    keyCode={keyCodeLeft}
                    onPress={() => {
                        onRotateLeft();
                        setLeft(true);
                    }}
                    onRelease={() => {
                        setLeft(false);
                    }}
                />
            )}
            {!disabled && (
                <KeyPressed
                    keyCode={keyCodeRight}
                    onPress={() => {
                        onRotateRight();
                        setRight(true);
                    }}
                    onRelease={() => {
                        setRight(false);
                    }}
                />
            )}
        </div>
    );
};
