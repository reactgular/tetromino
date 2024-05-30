import {rand} from '../utilities.types';

const COLORS = [
    'text-tetro_i-400',
    'text-tetro_o-400',
    'text-tetro_t-400',
    'text-tetro_s-400',
    'text-tetro_z-400',
    'text-tetro_j-400',
    'text-tetro_l-400'
];

export function* aniStrobe(): IterableIterator<string> {
    yield* COLORS;
}

export function* aniFlash(repeat: number): IterableIterator<string> {
    for (let x = 0; x < repeat; x++) {
        yield 'dark:text-gray-200 text-gray-300';
        yield 'dark:text-gray-600 text-gray-800';
    }
}

export function* aniRandom(count: number): IterableIterator<string> {
    for (let x = 0; x < count; x++) {
        yield COLORS[rand(COLORS.length)];
    }
}

export function* aniSlide(
    offset: number,
    length: number,
    forward: boolean
): IterableIterator<string> {
    const colors = COLORS.map((c) => [c, c, c]).flat();
    const start = offset;
    const end = offset + length;
    for (
        let x = forward ? start : end;
        forward ? x < end : x > start;
        forward ? x++ : x--
    ) {
        yield colors[x % colors.length];
    }
}

export function* aniAll(
    offset: number,
    length: number
): IterableIterator<string> {
    while (true) {
        yield* aniStrobe();
        yield* aniRandom(10);
        yield* aniSlide(offset, length, true);
        yield* aniFlash(2);
        yield* aniSlide(offset, length, false);
    }
}
