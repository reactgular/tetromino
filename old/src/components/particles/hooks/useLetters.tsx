import {useEffect, useMemo, useState} from 'react';
import {aniAll} from '../generators/animations';
import {useInterval} from './useInterval';

export interface Letter {
    char: string;

    color: IterableIterator<string>;

    key: number;
}

export const createLetters = (str: string): Array<Letter> => {
    return Array.from(str).map((char, key) => {
        return {char, key, color: aniAll(key, str.length)};
    });
};

export const nextColors = (letters: Array<Letter>): string[] => {
    return letters.map(({color}) => color.next().value);
};

export const useLetters = (
    str: string,
    speed: number
): [Array<Letter>, Array<string>] => {
    const [colors, setColors] = useState<string[]>([]);
    const letters = useMemo<Array<Letter>>(() => createLetters(str), [str]);
    useEffect(() => setColors(nextColors(letters)), [letters]);
    useInterval(() => setColors(nextColors(letters)), speed, [letters]);
    return [letters, colors];
};
