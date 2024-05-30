import {FC, useEffect, useRef} from 'react';

export interface GameAudioProps {
    autoPlay?: boolean;

    loop?: boolean;

    onDone?: () => void;

    onLoaded?: () => void;

    src: string;

    volume?: number;
}

export const GameAudio: FC<GameAudioProps> = ({
    autoPlay = true,
    loop,
    onDone,
    onLoaded,
    src,
    volume
}) => {
    const ref = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (volume) {
            ref.current!.volume = volume;
        }
    }, [ref, volume]);

    return (
        <audio
            src={src}
            ref={ref}
            autoPlay={autoPlay}
            controls={false}
            loop={Boolean(loop)}
            onEnded={() => onDone && onDone()}
            onCanPlayThrough={() => onLoaded && onLoaded()}
        />
    );
};
