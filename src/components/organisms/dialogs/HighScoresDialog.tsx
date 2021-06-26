import {FC} from 'react';
import {AppDialogType} from '../../../store/app/app-model';
import {AppSelectors} from '../../../store/app/app-selectors';
import {AppDialog, AppDialogControl} from '../../molecules/app/AppDialog';
import {GameHighScores} from '../../molecules/game/GameHighScores';

export const HighScoresDialog: FC<Partial<AppDialogControl>> = ({
    selectOpen = AppSelectors.isOpen(AppDialogType.HIGH_SCORES)
}) => {
    return (
        <AppDialog
            className="max-w-[12rem]"
            title="High Scores"
            selectOpen={selectOpen}
        >
            <GameHighScores className="ml-auto mr-auto" />
        </AppDialog>
    );
};
