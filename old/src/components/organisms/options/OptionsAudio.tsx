import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../../store/app-store';
import {AppActions} from '../../../store/app/app-actions';
import {AppSelectors} from '../../../store/app/app-selectors';
import {
    MUSIC_ICON,
    MUSIC_TYPES,
    SOUND_ICON,
    VOLUME_OPTIONS
} from '../../particles/audio.types';
import {UiButton} from '../../particles/ui/UiButton';
import {UiSelect} from '../../particles/ui/UiSelect';

export const OptionsAudio: FC = () => {
    const music = useSelector(AppSelectors.music);
    const musicType = useSelector(AppSelectors.musicType);
    const musicVolume = useSelector(AppSelectors.musicVolume);
    const sound = useSelector(AppSelectors.sound);
    const soundVolume = useSelector(AppSelectors.soundVolume);
    const dispatch = useAppDispatch();
    return (
        <>
            <div>Sound Fx</div>
            <UiButton
                className="flex rounded-full text-[12px] p-2 justify-center"
                active={sound}
                onClick={() => dispatch(AppActions.sound())}
            >
                {SOUND_ICON[sound.toString()]}
            </UiButton>
            <div>Sound Fx Volume</div>
            <UiSelect
                options={VOLUME_OPTIONS}
                value={soundVolume}
                onChange={(value) => dispatch(AppActions.soundVolume(value))}
            />
            <div>Music</div>
            <UiButton
                className="flex rounded-full text-[12px] p-2 justify-center"
                active={music}
                onClick={() => dispatch(AppActions.music())}
            >
                {MUSIC_ICON[music.toString()]}
            </UiButton>
            <div>Music Volume</div>
            <UiSelect
                options={VOLUME_OPTIONS}
                value={musicVolume}
                onChange={(value) => dispatch(AppActions.musicVolume(value))}
            />
            <div>Music Type</div>
            <UiSelect
                options={MUSIC_TYPES}
                value={musicType}
                onChange={(value) => dispatch(AppActions.musicType(value))}
            />
        </>
    );
};
