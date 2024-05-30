import {PayloadAction} from '@reduxjs/toolkit';
import classNames from 'classnames';
import {FC, useEffect, useMemo} from 'react';
import {FaHome} from 'react-icons/fa';
import {GiPodium} from 'react-icons/gi';
import {VscDebugRestart} from 'react-icons/vsc';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../../store/app-store';
import {AppActions} from '../../../store/app/app-actions';
import {AppDialogType} from '../../../store/app/app-model';
import {AppSelectors} from '../../../store/app/app-selectors';
import {GameActions} from '../../../store/game/game-actions';
import {GameSelectors} from '../../../store/game/game-selectors';
import {AppBar} from '../../atoms/app/AppBar';
import {ClassNameProps} from '../../particles/particles.types';
import {GameScore} from './GameScore';

export interface GameFinishProps {
    actionHighScores?: PayloadAction;

    actionHome?: PayloadAction;

    actionRestart?: PayloadAction<number>;
}

export const GameFinish: FC<GameFinishProps & ClassNameProps> = ({
    actionHome = GameActions.quit(),
    actionRestart = GameActions.start(1),
    actionHighScores = AppActions.open(AppDialogType.HIGH_SCORES),
    className
}) => {
    const score = useSelector(GameSelectors.score);
    const highScores = useSelector(AppSelectors.highScores);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(AppActions.recordScore(score));
    }, [dispatch, score]);

    const tools = useMemo(() => {
        return [
            {
                icon: <FaHome />,
                toolTip: 'Home',
                action: actionHome
            },
            {
                icon: <VscDebugRestart />,
                toolTip: 'Restart',
                action: actionRestart
            },
            {
                icon: <GiPodium />,
                toolTip: 'High Scores',
                action: actionHighScores
            }
        ];
    }, [actionHome, actionRestart, actionHighScores]);

    const rank = useMemo(() => {
        return highScores.indexOf(score) + 1;
    }, [highScores, score]);

    return (
        <div className={classNames(className, 'flex flex-col text-2xl')}>
            <div className="flex flex-col ml-auto mr-auto">
                <div className="font-mono text-center">Your Score</div>
                <GameScore rank={rank} score={score} />
                <div className="font-mono text-center mt-5">Your Best</div>
                <GameScore rank={1} score={highScores[0] || 0} />
            </div>
            <AppBar className="mt-5" tools={tools} />
        </div>
    );
};
