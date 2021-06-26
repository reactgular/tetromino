import classNames from 'classnames';
import {FC} from 'react';
import {FaBars} from 'react-icons/fa';
import {useAppDispatch} from '../../../store/app-store';
import {GameActions} from '../../../store/game/game-actions';
import {useUiTheme} from '../../particles/contexts/UiThemeContext';
import {ClassNameProps} from '../../particles/particles.types';
import {UiButton, UiButtonShape} from '../../particles/ui/UiButton';

export const GameSettings: FC<ClassNameProps> = ({className}) => {
    const dispatch = useAppDispatch();
    const {large} = useUiTheme();

    return (
        <UiButton
            data-testid="game-settings"
            className={classNames(className, 'flex text-sm', {
                'p-2': !large,
                'p-3': large
            })}
            preventFocus={true}
            primary={true}
            shape={UiButtonShape.ROUND}
            onClick={() => dispatch(GameActions.pause())}
        >
            <FaBars />
        </UiButton>
    );
};
