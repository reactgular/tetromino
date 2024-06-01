import {gameBufferEmpty} from '../../engine/game-buffer';
import {gamePlayerCreate} from '../../engine/game-player';
import {
    gameScreenFlatten,
    gameScreenRender,
    gameScreenWriter
} from '../../engine/game-screen';
import {TetrominosType} from '../../engine/game-tetrominos';
import {bufferPattern, screenToStr} from '../expect-utils';

describe(gameScreenFlatten.name, () => {
    it('should create a flat array from a buffer', () => {
        const fixtures = [
            [0, 0],
            [10, 20],
            [3, 9],
            [12, 49]
        ];
        fixtures.forEach(([width, height]) => {
            const buffer = gameBufferEmpty(width, height);
            expect(buffer).bufferSize(width, height);

            const flatten = Array.from(gameScreenFlatten(buffer));
            expect(flatten.length).toBe(width * height);

            flatten.forEach((cell) =>
                expect(cell).toStrictEqual({type: undefined, glow: undefined})
            );
        });
    });
});

describe(gameScreenRender.name, () => {
    it('should flatten a buffer', () => {
        const buffer = bufferPattern([
            '..o..',
            '.ooo.',
            'ooooo',
            '.ooo.',
            '..o..'
        ]);
        const screen = gameScreenRender(buffer);
        expect(screenToStr(screen)).toEqual('..o...ooo.OOOOO.ooo...o..');
    });

    it('should render a player piece', () => {
        const buffer = bufferPattern([
            '.....',
            '.....',
            '.....',
            '.....',
            '.....'
        ]);
        const player = gamePlayerCreate(TetrominosType.O, 5);
        const screen = gameScreenRender(buffer, player);
        expect(screenToStr(screen)).toEqual('.oo...oo.................');
    });
});

describe(gameScreenWriter.name, () => {
    it('should return a writer function that updates the screen', () => {
        const buffer = bufferPattern([
            '.....',
            '.....',
            '.....',
            '.....',
            '.....'
        ]);
        const screen = Array.from(gameScreenFlatten(buffer));
        const write = jest.fn((cell) => (cell.type = TetrominosType.O));
        const writer = gameScreenWriter(screen, 5, write);

        expect(screenToStr(screen)).toEqual('.........................');

        writer(0, 0);
        writer(2, 2);
        writer(4, 4);

        expect(screenToStr(screen)).toEqual('o...........o...........o');
    });
});
