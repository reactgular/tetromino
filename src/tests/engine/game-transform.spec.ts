import {PIECE_I, PIECE_L, PIECE_O} from '../../engine/game-pieces';
import {GAME_PIECES, gamePlayerCreate} from '../../engine/game-player';
import {TetrominosType} from '../../engine/game-tetrominos';
import {
    gameTransform,
    rotateLeft,
    rotateNoop,
    rotateRight,
    translateDown,
    translateLeft,
    translateNoop,
    translateRight,
    translateUp
} from '../../engine/game-transform';

describe('Translate', () => {
    it('should only change one axis', () => {
        expect(translateUp([0, 0])).toEqual([0, -1]);
        expect(translateDown([0, 0])).toEqual([0, 1]);
        expect(translateLeft([0, 0])).toEqual([-1, 0]);
        expect(translateRight([0, 0])).toEqual([1, 0]);
    });

    it('should not change coords', () => {
        expect(translateNoop([0, 0])).toEqual([0, 0]);
    });
});

describe('Rotate', () => {
    it('should not rotate pieces with one shape', () => {
        expect(PIECE_O.length).toEqual(1);

        expect(rotateRight(PIECE_O, 0)).toEqual(0);
        expect(rotateLeft(PIECE_O, 0)).toEqual(0);
    });

    it('should rotate pieces of 2 shapes', () => {
        expect(PIECE_I.length).toEqual(2);

        expect(rotateRight(PIECE_I, 0)).toEqual(1);
        expect(rotateRight(PIECE_I, 1)).toEqual(0);

        expect(rotateLeft(PIECE_I, 0)).toEqual(1);
        expect(rotateLeft(PIECE_I, 1)).toEqual(0);
    });

    it('should rotate pieces of 4 shapes', () => {
        expect(PIECE_L.length).toEqual(4);

        expect(rotateRight(PIECE_L, 0)).toEqual(1);
        expect(rotateRight(PIECE_L, 1)).toEqual(2);
        expect(rotateRight(PIECE_L, 2)).toEqual(3);
        expect(rotateRight(PIECE_L, 3)).toEqual(0);

        expect(rotateLeft(PIECE_L, 0)).toEqual(3);
        expect(rotateLeft(PIECE_L, 1)).toEqual(0);
        expect(rotateLeft(PIECE_L, 2)).toEqual(1);
        expect(rotateLeft(PIECE_L, 3)).toEqual(2);
    });

    it('should not rotate pieces', () => {
        expect(rotateNoop(PIECE_L, 0)).toEqual(0);
        expect(rotateNoop(PIECE_L, 1)).toEqual(1);
        expect(rotateNoop(PIECE_L, 2)).toEqual(2);
        expect(rotateNoop(PIECE_L, 3)).toEqual(3);
    });
});

describe(gameTransform.name, () => {
    it('should call the transform function', () => {
        const trans = jest.fn(translateNoop);
        const player = gamePlayerCreate(TetrominosType.S, 10);
        const transform = gameTransform(player, trans, rotateNoop);
        expect(trans.mock.calls.length).toEqual(1);
        expect(trans.mock.calls[0][0]).toStrictEqual([player.x, player.y]);
        expect(transform.x).toEqual(player.x);
        expect(transform.y).toEqual(player.y);
        expect(transform.rotate).toEqual(player.rotate);
    });

    it('should call the rotate function', () => {
        const rotate = jest.fn(rotateNoop);
        const player = gamePlayerCreate(TetrominosType.S, 10);
        const transform = gameTransform(player, translateNoop, rotate);
        expect(rotate.mock.calls.length).toEqual(1);
        expect(rotate.mock.calls[0][0]).toStrictEqual(GAME_PIECES[player.type]);
        expect(rotate.mock.calls[0][1]).toStrictEqual(player.rotate);
        expect(transform.x).toEqual(player.x);
        expect(transform.y).toEqual(player.y);
        expect(transform.rotate).toEqual(player.rotate);
    });
});
