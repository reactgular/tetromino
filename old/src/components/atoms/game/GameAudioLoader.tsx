import {FC, useCallback, useMemo} from 'react';
import {GameAudio} from './GameAudio';

export interface GameAudioLoaderProps {
    onLoaded: () => void;

    sources: Array<string>;
}

export const GameAudioLoader: FC<GameAudioLoaderProps> = ({
    sources,
    onLoaded
}) => {
    const sourceMap = useMemo(() => {
        const pairs: Array<[string, boolean]> = sources.map((src) => [
            src,
            false
        ]);
        return new Map<string, boolean>(pairs);
    }, [sources]);

    const setLoaded = useCallback(
        (key: string) => {
            sourceMap.set(key, true);
            const values = Array.from(sourceMap.values());
            if (values.every((loaded) => loaded)) {
                onLoaded();
            }
        },
        [sourceMap, onLoaded]
    );

    return (
        <>
            {Array.from(sourceMap.keys()).map((src) => (
                <GameAudio
                    key={src}
                    src={src}
                    autoPlay={false}
                    onLoaded={() => setLoaded(src)}
                />
            ))}
        </>
    );
};
