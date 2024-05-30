import classNames from 'classnames';
import {FC, ReactElement, useState} from 'react';
import {useUiTheme} from '../../particles/contexts/UiThemeContext';
import {KeyPressed} from '../../particles/nulls/KeyPressed';
import {ClassNameProps} from '../../particles/particles.types';
import {UiButton, UiButtonShape} from '../../particles/ui/UiButton';

export interface GameDropProps {
    disabled?: boolean;

    icon: ReactElement;

    keyCode: string;

    onDrop: (pressed: boolean) => void;

    shape: UiButtonShape;
}

export const GameDrop: FC<GameDropProps & ClassNameProps> = ({
    disabled,
    icon,
    keyCode,
    onDrop,
    shape,
    className
}) => {
    const [active, setActive] = useState(false);
    const {large} = useUiTheme();

    return (
        <>
            <UiButton
                className={classNames(
                    className,
                    'items-center justify-center',
                    {'p-4': !large, 'p-5': large}
                )}
                disabled={disabled}
                preventFocus={true}
                shape={shape}
                active={active}
                data-testid="game-soft-drop"
                onPress={() => onDrop(true)}
                onRelease={() => onDrop(false)}
            >
                {icon}
            </UiButton>
            {!disabled && (
                <KeyPressed
                    keyCode={keyCode}
                    onPress={() => {
                        onDrop(true);
                        setActive(true);
                    }}
                    onRelease={() => {
                        onDrop(false);
                        setActive(false);
                    }}
                />
            )}
        </>
    );
};
