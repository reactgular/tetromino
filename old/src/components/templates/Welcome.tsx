import {FC, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {environment} from '../../environment/environment';
import {AppActions} from '../../store/app/app-actions';
import {AppDialogType} from '../../store/app/app-model';
import {AppSelectors} from '../../store/app/app-selectors';
import {GameActions} from '../../store/game/game-actions';
import {AppLogo} from '../atoms/app/AppLogo';
import {AppMenu, AppMenuItem} from '../atoms/app/AppMenu';
import {AppDarkMode} from '../molecules/app/AppDarkMode';

export interface WelcomeProps {
    selectStart?: () => number;
}

export const Welcome: FC<WelcomeProps> = ({
    selectStart = AppSelectors.startLevel
}) => {
    const startLevel = useSelector(selectStart);

    const menu: Array<AppMenuItem> = useMemo(() => {
        return [
            {
                title: 'New Game',
                action: GameActions.start(startLevel),
                active: true
            },
            {title: `Level: ${startLevel}`, action: AppActions.startLevel()},
            {
                title: 'High Scores',
                action: AppActions.open(AppDialogType.HIGH_SCORES)
            },
            {title: 'Options', action: AppActions.open(AppDialogType.OPTIONS)},
            {title: 'Credits', action: AppActions.open(AppDialogType.CREDITS)}
        ];
    }, [startLevel]);

    return (
        <div className="flex flex-col h-full">
            <AppLogo
                className="mt-auto mb-14"
                name={environment.brandName.toUpperCase()}
            />
            <AppMenu className="w-44 ml-auto mr-auto" items={menu} />
            <AppDarkMode className="ml-auto mr-auto mt-5 mb-auto" />
        </div>
    );
};
