import {GameBuffer, gameBufferEmpty} from '../../engine/game-buffer';
import {
    gameCollideBlock,
    gameCollideBuffer,
    gameCollision
} from '../../engine/game-collision';
import {gamePlayerCreate} from '../../engine/game-player';
import {TetrominosType} from '../../engine/game-tetrominos';
import {
    gameTransform,
    rotateNoop,
    translateNoop,
    translateUp
} from '../../engine/game-transform';
import {bufferPattern} from '../expect-utils';

describe(gameCollideBuffer.name, () => {
    const width = 10,
        height = 20;
    let buffer: GameBuffer;

    beforeEach(() => {
        buffer = gameBufferEmpty(width, height);
    });

    it('should be false for every point inside the buffer', () => {
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                expect(gameCollideBuffer(buffer, x, y)).toEqual(false);
            }
        }
    });

    it('should be true for values outside the buffer', () => {
        expect(gameCollideBuffer(buffer, -1, 0)).toEqual(true);
        expect(gameCollideBuffer(buffer, 0, -1)).toEqual(true);
        expect(gameCollideBuffer(buffer, -1, -1)).toEqual(true);
        expect(gameCollideBuffer(buffer, 0, height)).toEqual(true);
        expect(gameCollideBuffer(buffer, width, 0)).toEqual(true);
        expect(gameCollideBuffer(buffer, width, height)).toEqual(true);
    });
});

describe(gameCollideBlock.name, () => {
    it('should be false for every coordinate of an empty buffer', () => {
        const buffer = bufferPattern([
            '.....',
            '.....',
            '.....',
            '.....',
            '.....'
        ]);
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                expect(gameCollideBlock(buffer, x, y)).toEqual(false);
            }
        }
    });

    it('should be true for every coordinate of a full buffer', () => {
        const buffer = bufferPattern([
            'iiiii',
            'ioooi',
            'iotoi',
            'ioooi',
            'iiiii'
        ]);
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                expect(gameCollideBlock(buffer, x, y)).toEqual(true);
            }
        }
    });

    it('should be false for the center, and true for neighbors', () => {
        const buffer = bufferPattern([
            'iiiii',
            'ioooi',
            'io.oi',
            'ioooi',
            'iiiii'
        ]);
        expect(gameCollideBlock(buffer, 1, 1)).toEqual(true);
        expect(gameCollideBlock(buffer, 2, 1)).toEqual(true);
        expect(gameCollideBlock(buffer, 3, 1)).toEqual(true);

        expect(gameCollideBlock(buffer, 1, 2)).toEqual(true);
        expect(gameCollideBlock(buffer, 2, 2)).toEqual(false);
        expect(gameCollideBlock(buffer, 3, 2)).toEqual(true);

        expect(gameCollideBlock(buffer, 1, 3)).toEqual(true);
        expect(gameCollideBlock(buffer, 2, 3)).toEqual(true);
        expect(gameCollideBlock(buffer, 3, 3)).toEqual(true);
    });
});

describe(gameCollision.name, () => {
    const emptyBuffer = bufferPattern([
        '.....',
        '.....',
        '.....',
        '.....',
        '.....'
    ]);

    const player = gamePlayerCreate(TetrominosType.O, 5);

    const fullBuffer = bufferPattern([
        'ooooo',
        'ooooo',
        'ooooo',
        'ooooo',
        'ooooo'
    ]);

    it('should not collide with default position', () => {
        expect(
            gameCollision(
                gameTransform(player, translateNoop, rotateNoop),
                emptyBuffer
            )
        ).toEqual(false);
    });

    it('should collide with buffer edges', () => {
        expect(
            gameCollision(
                gameTransform(player, translateUp, rotateNoop),
                emptyBuffer
            )
        ).toEqual(true);

        expect(
            gameCollision(
                gameTransform(player, ([x, y]) => [x, y + 10], rotateNoop),
                emptyBuffer
            )
        ).toEqual(true);

        expect(
            gameCollision(
                gameTransform(player, ([x, y]) => [x + 10, y + 10], rotateNoop),
                emptyBuffer
            )
        ).toEqual(true);

        expect(
            gameCollision(
                gameTransform(player, ([x, y]) => [x + 10, y], rotateNoop),
                emptyBuffer
            )
        ).toEqual(true);
    });

    it('should collide in full buffer with default position', () => {
        expect(
            gameCollision(
                gameTransform(player, translateNoop, rotateNoop),
                fullBuffer
            )
        ).toEqual(true);
    });

    it('should collide in center of full buffer', () => {
        expect(
            gameCollision(
                gameTransform(player, ([x, y]) => [x + 2, y + 2], rotateNoop),
                fullBuffer
            )
        ).toEqual(true);
    });
});
