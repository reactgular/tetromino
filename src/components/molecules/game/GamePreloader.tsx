import classNames from 'classnames';
import {FC, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {AppSelectors} from '../../../store/app/app-selectors';
import {GameAudioLoader} from '../../atoms/game/GameAudioLoader';
import {AUDIO_FILES, PRELOAD_AUDIO} from '../../particles/audio.types';
import {ClassNameProps} from '../../particles/particles.types';

export interface GamePreloaderProps {
    onLoaded: () => void;
}

export const GamePreloader: FC<GamePreloaderProps & ClassNameProps> = ({
    onLoaded,
    className
}) => {
    const musicType = useSelector(AppSelectors.musicType);
    const preload = useMemo(
        () => [...PRELOAD_AUDIO, AUDIO_FILES[musicType]],
        [musicType]
    );
    return (
        <div
            data-testid="game-loader"
            className={classNames(
                className,
                'flex font-mono items-center justify-center text-2xl'
            )}
        >
            Loading
            <GameAudioLoader sources={preload} onLoaded={onLoaded} />
        </div>
    );
};
