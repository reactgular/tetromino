import classNames from 'classnames';
import {FC} from 'react';
import {useAppDispatch} from '../../../store/app-store';
import {AppActions} from '../../../store/app/app-actions';
import {AppDarkMode} from '../../molecules/app/AppDarkMode';
import {ClassNameProps} from '../../particles/particles.types';
import {UiButton} from '../../particles/ui/UiButton';
import {OptionsAudio} from '../options/OptionsAudio';
import {OptionsGame} from '../options/OptionsGame';
import {OptionsKeyBindings} from '../options/OptionsKeyBindings';

export interface GameOptionsProps {
    darkMode: boolean;
}

export const GameOptions: FC<GameOptionsProps & ClassNameProps> = ({
    darkMode,
    className
}) => {
    const dispatch = useAppDispatch();
    return (
        <div className={classNames(className, 'flex flex-col')}>
            <div className="grid grid-cols-2 gap-2">
                <OptionsKeyBindings />
                <OptionsGame />
                <OptionsAudio />
                <UiButton
                    className="mt-3 py-2"
                    onClick={() => dispatch(AppActions.resetScore())}
                >
                    Reset High Scores
                </UiButton>
                <UiButton
                    className="mt-3 py-2"
                    onClick={() => dispatch(AppActions.resetOptions())}
                >
                    Reset Options
                </UiButton>
            </div>
            {darkMode && <AppDarkMode className="ml-auto mr-auto mt-5" />}
        </div>
    );
};
