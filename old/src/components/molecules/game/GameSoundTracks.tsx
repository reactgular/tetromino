import {FC} from 'react';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../../store/app-store';
import {AppSelectors} from '../../../store/app/app-selectors';
import {GameActions} from '../../../store/game/game-actions';
import {GameSelectors} from '../../../store/game/game-selectors';
import {GameAudio} from '../../atoms/game/GameAudio';

export const GameSoundTracks: FC = () => {
    const sound = useSelector(AppSelectors.sound);
    const soundVolume = useSelector(AppSelectors.soundVolume);
    const soundTracks = useSelector(GameSelectors.soundTracks);
    const dispatch = useAppDispatch();

    return (
        <>
            {sound &&
                soundTracks.map(({id, src}) => (
                    <GameAudio
                        key={id}
                        src={src}
                        volume={soundVolume / 100}
                        onDone={() => dispatch(GameActions.soundTrack(id))}
                    />
                ))}
        </>
    );
};
