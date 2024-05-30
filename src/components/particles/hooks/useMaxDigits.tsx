import {useMemo} from 'react';

/**
 * Returns a number as a string with a max number of digits. Rendering
 * 9s if the number is too large.
 */
export const useMaxDigits = (value: number, maxDigits: number) => {
    return useMemo(() => {
        const str = value.toString();
        return str.length > maxDigits ? '9'.repeat(maxDigits) : str;
    }, [value, maxDigits]);
};
