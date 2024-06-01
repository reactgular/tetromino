import classNames from 'classnames';
import {FC} from 'react';
import {FaBars} from 'react-icons/fa';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../../store/app-store';
import {GameActions} from '../../../store/game/game-actions';
import {GameSelectors} from '../../../store/game/game-selectors';
import {useUiTheme} from '../../particles/contexts/UiThemeContext';
import {KeyPressed} from '../../particles/nulls/KeyPressed';
import {ClassNameProps} from '../../particles/particles.types';
import {UiButton, UiButtonShape} from '../../particles/ui/UiButton';

export const GameSettings: FC<ClassNameProps> = ({className}) => {
    const paused = useSelector(GameSelectors.paused);
    const dispatch = useAppDispatch();
    const {large} = useUiTheme();

    return (
        <>
            <UiButton
                data-testid="game-settings"
                className={classNames(className, 'flex text-sm', {
                    'p-2': !large,
                    'p-3': large
                })}
                disabled={paused}
                preventFocus={true}
                primary={true}
                shape={UiButtonShape.ROUND}
                onClick={() => dispatch(GameActions.pause())}
            >
                <FaBars />
            </UiButton>
            {!paused && (
                <KeyPressed
                    keyCode={'Escape'}
                    onPress={() => dispatch(GameActions.pause())}
                />
            )}
        </>
    );
};
