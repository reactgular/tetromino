import {FC, useMemo} from 'react';
import {FaCog} from 'react-icons/fa';
import {useSelector} from 'react-redux';
import {AppActions} from '../../../store/app/app-actions';
import {AppDialogType} from '../../../store/app/app-model';
import {AppSelectors} from '../../../store/app/app-selectors';
import {GameActions} from '../../../store/game/game-actions';
import {GameSelectors} from '../../../store/game/game-selectors';
import {AppBar, AppBarTool} from '../../atoms/app/AppBar';
import {AppMenu, AppMenuItem} from '../../atoms/app/AppMenu';
import {AppDialog, AppDialogControl} from '../../molecules/app/AppDialog';
import {
    MUSIC_ICON,
    MUSIC_TOOLTIP,
    SOUND_ICON,
    SOUND_TOOLTIP
} from '../../particles/audio.types';

export interface PauseDialogProps {
    selectMusic?: () => boolean;

    selectSound?: () => boolean;

    selectStart?: () => number;
}

export const PauseDialog: FC<PauseDialogProps & Partial<AppDialogControl>> = ({
    selectMusic = AppSelectors.music,
    selectSound = AppSelectors.sound,
    selectStart = AppSelectors.startLevel,
    closeAction = GameActions.resume(),
    selectOpen = GameSelectors.paused
}) => {
    const music = useSelector(selectMusic);
    const sound = useSelector(selectSound);
    const startLevel = useSelector(selectStart);

    const tools = useMemo((): AppBarTool[] => {
        return [
            {
                icon: SOUND_ICON[sound.toString()],
                toolTip: SOUND_TOOLTIP[sound.toString()],
                active: sound,
                action: AppActions.sound()
            },
            {
                icon: MUSIC_ICON[music.toString()],
                toolTip: MUSIC_TOOLTIP[music.toString()],
                active: music,
                action: AppActions.music()
            },
            {
                icon: <FaCog />,
                toolTip: 'Options',
                action: AppActions.open(AppDialogType.OPTIONS)
            }
        ];
    }, [music, sound]);

    const menu: Array<AppMenuItem> = useMemo(() => {
        return [
            {title: 'Continue', action: GameActions.resume(), active: true},
            {title: 'Restart', action: GameActions.start(startLevel)},
            {title: 'Quit Game', action: GameActions.quit()}
        ];
    }, [startLevel]);

    return (
        <AppDialog
            className="max-w-[12rem]"
            title="Paused"
            selectOpen={selectOpen}
            closeAction={closeAction}
        >
            <AppMenu className="mb-5" items={menu} />
            <AppBar tools={tools} />
        </AppDialog>
    );
};
