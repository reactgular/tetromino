import {useMemo} from 'react';

export const useSpaces = (
    length: number
): {
    __html: string;
} => {
    return useMemo(() => ({__html: '&nbsp;'.repeat(length)}), [length]);
};
