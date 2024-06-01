import {FC} from 'react';
import {useSelector} from 'react-redux';
import {AppDialogType} from '../../../store/app/app-model';
import {AppSelectors} from '../../../store/app/app-selectors';
import {GameSelectors} from '../../../store/game/game-selectors';
import {AppCopyright} from '../../atoms/app/AppCopyright';
import {AppDialog, AppDialogControl} from '../../molecules/app/AppDialog';
import {GameOptions} from '../game/GameOptions';

export interface OptionsDialogProps {
    selectWelcoming?: () => boolean;

    version: string;
}

export const OptionsDialog: FC<OptionsDialogProps & Partial<AppDialogControl>> =
    ({
        selectWelcoming = GameSelectors.welcoming,
        selectOpen = AppSelectors.isOpen(AppDialogType.OPTIONS),
        version
    }) => {
        const welcoming = useSelector(selectWelcoming);
        return (
            <AppDialog
                className="max-w-[22rem]"
                title="Options"
                large={true}
                selectOpen={selectOpen}
            >
                <GameOptions darkMode={!welcoming} />
                <AppCopyright version={version} className="mx-auto mt-5" />
            </AppDialog>
        );
    };
