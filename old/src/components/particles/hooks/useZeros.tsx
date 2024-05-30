import {useMemo} from 'react';

/**
 * Returns a string filled with 0s.
 */
export const useZeros = (digits: number) => {
    return useMemo(() => '0'.repeat(digits), [digits]);
};
