import {DependencyList, useEffect, useMemo} from 'react';

export const useInterval = (
    callback: () => void,
    ms: number,
    deps: DependencyList
) => {
    const all_deps = useMemo(
        () => [callback, ms, ...deps],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [callback, ms, deps]
    );
    useEffect(() => {
        const id = setInterval(() => callback(), ms);
        return () => clearInterval(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, all_deps);
};
