import {Tooltip} from '@material-ui/core';
import classNames from 'classnames';
import {ButtonHTMLAttributes, FC, useMemo, useRef} from 'react';
import {useUiTheme} from '../contexts/UiThemeContext';
import {ClassNameProps} from '../particles.types';
import './UiButton.css';

export enum UiButtonShape {
    NORMAL,
    ROUND,
    LEFT,
    RIGHT,
    UP,
    DOWN
}

export interface UiButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    active?: boolean;

    onPress?: () => void;

    onRelease?: () => void;

    preventFocus?: boolean;

    primary?: boolean;

    secondary?: boolean;

    shape?: UiButtonShape;

    toolTip?: string;
}

export const UiButton: FC<UiButtonProps & ClassNameProps> = ({
    active,
    preventFocus,
    primary,
    secondary,
    toolTip,
    shape = UiButtonShape.NORMAL,
    className,
    children,
    onMouseDown,
    onMouseUp,
    onPress,
    onRelease,
    ...props
}) => {
    const touching = useRef(false);
    const {transparent} = useUiTheme();
    const classes = useMemo(() => {
        return classNames(className, 'ui-button', {
            'ui-button-standard': !transparent,
            'ui-button-trans': transparent,
            'ui-shape-round': shape === UiButtonShape.ROUND,
            'ui-shape-normal': shape === UiButtonShape.NORMAL,
            'ui-shape-left': shape === UiButtonShape.LEFT,
            'ui-shape-right': shape === UiButtonShape.RIGHT,
            'ui-shape-up': shape === UiButtonShape.UP,
            'ui-shape-down': shape === UiButtonShape.DOWN,
            'text-primary': primary,
            'text-secondary': secondary,
            active
        });
    }, [active, primary, secondary, shape, transparent, className]);
    return (
        <Tooltip title={toolTip || ''}>
            <button
                className={classes}
                onTouchStart={() => {
                    touching.current = true;
                    onPress && onPress();
                }}
                onTouchEnd={() => {
                    onRelease && onRelease();
                }}
                onMouseDown={(e) => {
                    if (preventFocus) {
                        e.preventDefault();
                    }
                    !touching.current && onPress && onPress();
                }}
                onMouseUp={(e) => {
                    !touching.current && onRelease && onRelease();
                }}
                {...props}
            >
                {children}
            </button>
        </Tooltip>
    );
};
