import {useEffect, useMemo} from 'react';

function createAudio(
    src: string,
    volume: number,
    loop: boolean
): HTMLAudioElement {
    const audio = new Audio(src);
    audio.loop = loop;
    audio.volume = volume / 100;
    return audio;
}

/**
 * @deprecated
 */
export const useAudio = (
    src: string,
    play: boolean,
    volume: number,
    loop: boolean,
    onDone?: () => void
) => {
    const audio = useMemo(
        () => createAudio(src, volume, loop),
        [src, volume, loop]
    );

    useEffect(() => {
        const ended = () => onDone && onDone();
        if (play) {
            audio.play().then();
            audio.addEventListener('ended', ended);
        }
        return () => {
            audio.pause();
            audio.removeEventListener('ended', ended);
        };
    }, [audio, play, onDone]);
};
