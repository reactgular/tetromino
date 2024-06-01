'use client';

import {useMediaQuery} from '@material-ui/core';
import {FC, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {environment} from '../../environment/environment';
import {GameSelectors} from '../../store/game/game-selectors';
import {CreditsDialog} from '../organisms/dialogs/CreditsDialog';
import {FinishDialog} from '../organisms/dialogs/FinishDialog';
import {HighScoresDialog} from '../organisms/dialogs/HighScoresDialog';
import {OptionsDialog} from '../organisms/dialogs/OptionsDialog';
import {PauseDialog} from '../organisms/dialogs/PauseDialog';
import {UiThemeProvider} from '../particles/contexts/UiThemeContext';
import {usePageView} from '../particles/hooks/usePageView';
import {usePersist} from '../particles/hooks/usePersist';
import {useTitle} from '../particles/hooks/useTitle';
import {GameDesktop} from './GameDesktop';
import {GameMobile} from './GameMobile';
import {Welcome} from './Welcome';

export interface AppProps {
    version: string;
}

export const App: FC<AppProps> = ({version}) => {
    const welcoming = useSelector(GameSelectors.welcoming);
    const isWideScreen = useMediaQuery('(min-width:600px)');
    const isShortScreen = useMediaQuery('(max-height:850px)');
    const isNarrowScreen = useMediaQuery('(max-width:380px)');

    usePageView('/');
    usePersist(version, environment.storageKey);
    useTitle();

    const game = useMemo(() => {
        return (
            <UiThemeProvider
                transparent={!isWideScreen}
                large={!isWideScreen && !isNarrowScreen}
            >
                {isWideScreen ? (
                    <GameDesktop floatControls={isShortScreen} />
                ) : (
                    <GameMobile />
                )}
            </UiThemeProvider>
        );
    }, [isWideScreen, isShortScreen, isNarrowScreen]);

    return (
        <div className="flex flex-col w-full h-full">
            {welcoming ? <Welcome /> : game}
            <PauseDialog />
            <FinishDialog />
            <HighScoresDialog />
            <OptionsDialog version={version} />
            <CreditsDialog />
        </div>
    );
};
