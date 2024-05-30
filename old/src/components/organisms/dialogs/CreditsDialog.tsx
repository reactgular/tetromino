import {FC} from 'react';
import {environment} from '../../../environment/environment';
import {AppDialogType} from '../../../store/app/app-model';
import {AppSelectors} from '../../../store/app/app-selectors';
import {AppDialog, AppDialogControl} from '../../molecules/app/AppDialog';
import {GameCredit, GameCredits} from '../../molecules/game/GameCredits';

const gameCredits: Array<GameCredit> = [
    {
        title: 'UX Design by',
        desc: 'Zayn Assalam',
        url: 'https://dribbble.com/shots/14684127-Tetris-Mobile-App'
    },
    {
        title: 'Programmed by',
        desc: 'Nick Foscarini',
        url: 'https://www.linkedin.com/in/nick-foscarini/'
    },
    {
        title: 'Built with',
        desc: 'ReactJS',
        url: 'https://reactjs.org/'
    },
    {
        title: 'States managed by',
        desc: 'Redux Toolkit',
        url: 'https://redux-toolkit.js.org/'
    },
    {
        title: 'Styled with',
        desc: 'tailwindcss',
        url: 'https://tailwindcss.com/'
    },
    {
        title: 'Source code',
        desc: 'GitHub',
        url: environment.github
    }
];

export const CreditsDialog: FC<Partial<AppDialogControl>> = ({
    selectOpen = AppSelectors.isOpen(AppDialogType.CREDITS)
}) => {
    return (
        <AppDialog
            className="max-w-[12rem]"
            title="Credits"
            selectOpen={selectOpen}
        >
            <GameCredits credits={gameCredits} />
        </AppDialog>
    );
};
