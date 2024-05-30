import classNames from 'classnames';
import {FC, useState} from 'react';
import {CgArrowsExpandLeft} from 'react-icons/cg';
import {useUiTheme} from '../../particles/contexts/UiThemeContext';
import {KeyPressed} from '../../particles/nulls/KeyPressed';
import {ClassNameProps} from '../../particles/particles.types';
import {UiButton, UiButtonShape} from '../../particles/ui/UiButton';

export interface GameHoldProps {
    disabled: boolean;

    keyCode: string;

    onHold: () => void;
}

export const GameHold: FC<GameHoldProps & ClassNameProps> = ({
    disabled,
    keyCode,
    onHold,
    className
}) => {
    const [active, setActive] = useState(false);
    const {large} = useUiTheme();

    return (
        <>
            <UiButton
                data-testid="game-hold"
                className={classNames(className, 'flex text-sm', {
                    'p-2': !large,
                    'p-3': large
                })}
                preventFocus={true}
                disabled={disabled}
                active={active && !disabled}
                shape={UiButtonShape.ROUND}
                onClick={() => onHold()}
            >
                <CgArrowsExpandLeft />
            </UiButton>
            <KeyPressed
                keyCode={keyCode}
                onPress={() => {
                    !disabled && onHold();
                    setActive(true);
                }}
                onRelease={() => {
                    setActive(false);
                }}
            />
        </>
    );
};
