import {ReactElement} from 'react';
import {FaMusic, FaVolumeMute, FaVolumeUp} from 'react-icons/fa';
import {environment} from '../../environment/environment';
import {UiOption} from './ui/UiSelect';

export const AUDIO_FILES = [
    `${environment.base}/audio/music/bonkers-for-arcades.mp3`,
    `${environment.base}/audio/music/the-ice-cream-man.mp3`,
    `${environment.base}/audio/music/8-bit-perplexion.mp3`,
    `${environment.base}/audio/music/its-raining-pixels.mp3`,
    `${environment.base}/audio/music/arcade-puzzler.mp3`
];

export const SOUND_FINISHED = `${environment.base}/audio/sounds/power-down-13.mp3`;
export const SOUND_LEVEL = `${environment.base}/audio/sounds/retro-chip-power.mp3`;
export const SOUND_SCORE = `${environment.base}/audio/sounds/ui-quirky-19.mp3`;
export const SOUND_DROP = `${environment.base}/audio/sounds/zapsplat_bambo_swoosh.mp3`;
export const SOUND_LEVEL_10 = `${environment.base}/audio/sounds/zapsplat_level_up.mp3`;

export const PRELOAD_AUDIO = [
    SOUND_FINISHED,
    SOUND_LEVEL,
    SOUND_SCORE,
    SOUND_DROP,
    SOUND_LEVEL_10
];

export const VOLUME_OPTIONS: Array<UiOption<number>> = Array(11)
    .fill(null)
    .map((_, indx) => indx * 10)
    .map((value) => ({label: `${value}%`, value}));

export const MUSIC_TYPES: Array<UiOption<number>> = AUDIO_FILES.map(
    (_, value) => ({label: `Type ${value + 1}`, value})
);

export const SOUND_ICON: Record<string, ReactElement> = {
    true: <FaVolumeUp />,
    false: <FaVolumeMute />
};

export const SOUND_TOOLTIP: Record<string, string> = {
    true: 'Turn sound off',
    false: 'Turn sound on'
};

export const MUSIC_ICON: Record<string, ReactElement> = {
    true: <FaMusic />,
    false: <FaVolumeMute />
};

export const MUSIC_TOOLTIP: Record<string, string> = {
    true: 'Turn music off',
    false: 'Turn music on'
};

export interface SoundTrack {
    id: number;

    src: string;
}
