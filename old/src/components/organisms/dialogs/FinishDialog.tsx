import {FC} from 'react';
import {useSelector} from 'react-redux';
import {AppSelectors} from '../../../store/app/app-selectors';
import {GameActions} from '../../../store/game/game-actions';
import {GameSelectors} from '../../../store/game/game-selectors';
import {AppDialog, AppDialogControl} from '../../molecules/app/AppDialog';
import {GameFinish} from '../../molecules/game/GameFinish';

export interface FinishDialogProps {
    selectStart?: () => number;
}

export const FinishDialog: FC<FinishDialogProps & Partial<AppDialogControl>> =
    ({
        selectStart = AppSelectors.startLevel,
        selectOpen = GameSelectors.finished
    }) => {
        const level = useSelector(selectStart);
        return (
            <AppDialog
                className="max-w-[12rem]"
                title="Game Over"
                selectOpen={selectOpen}
            >
                <GameFinish actionRestart={GameActions.start(level)} />
            </AppDialog>
        );
    };
