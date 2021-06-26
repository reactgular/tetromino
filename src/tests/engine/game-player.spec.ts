import {
    GAME_PIECES,
    gamePlayerCreate,
    gamePlayerDrop,
    gamePlayerTransform
} from '../../engine/game-player';
import {gameScreenRender} from '../../engine/game-screen';
import {TETROMINOS_TYPES, TetrominosType} from '../../engine/game-tetrominos';
import {
    gameTransform,
    rotateLeft,
    rotateNoop,
    rotateRight,
    translateLeft,
    translateNoop,
    translateRight
} from '../../engine/game-transform';
import {bufferPattern} from '../expect-utils';

describe('GAME_PIECES', () => {
    it('should have all pieces', () => {
        TETROMINOS_TYPES.forEach((type) => {
            expect(GAME_PIECES[type]).not.toBeUndefined();
            expect(Array.isArray(GAME_PIECES[type])).toEqual(true);
        });
    });
});

describe(gamePlayerCreate.name, () => {
    it('should position piece in the center', () => {
        TETROMINOS_TYPES.forEach((type) => {
            expect(gamePlayerCreate(type, 10).x).toEqual(5);
            expect(gamePlayerCreate(type, 12).x).toEqual(6);
            expect(gamePlayerCreate(type, 14).x).toEqual(7);
            expect(gamePlayerCreate(type, 16).x).toEqual(8);
        });
    });

    it('should position piece on first row', () => {
        expect(gamePlayerCreate(TetrominosType.I, 10).y).toEqual(0);
        expect(gamePlayerCreate(TetrominosType.O, 10).y).toEqual(0);
    });

    it('should position piece on second row', () => {
        expect(gamePlayerCreate(TetrominosType.T, 10).y).toEqual(1);
        expect(gamePlayerCreate(TetrominosType.S, 10).y).toEqual(1);
        expect(gamePlayerCreate(TetrominosType.Z, 10).y).toEqual(1);
        expect(gamePlayerCreate(TetrominosType.J, 10).y).toEqual(1);
        expect(gamePlayerCreate(TetrominosType.L, 10).y).toEqual(1);
    });

    it('should set the type', () => {
        TETROMINOS_TYPES.forEach((type) => {
            expect(gamePlayerCreate(type, 10).type).toEqual(type);
        });
    });

    it('should not be rotated', () => {
        TETROMINOS_TYPES.forEach((type) => {
            expect(gamePlayerCreate(type, 10).rotate).toEqual(0);
        });
    });
});

describe(gamePlayerDrop.name, () => {
    it('should render the piece into the buffer', () => {
        const buffer = bufferPattern([
            '.....',
            '.....',
            '.....',
            '.....',
            '.....'
        ]);
        const player = gamePlayerCreate(TetrominosType.O, 5);
        gamePlayerDrop(player, buffer);

        expect(buffer).bufferEqual([
            '.oo..',
            '.oo..',
            '.....',
            '.....',
            '.....'
        ]);
    });

    it('should mark rows for removal', () => {
        const buffer = bufferPattern([
            '.....',
            '.....',
            '.....',
            '.....',
            'o.ooo'
        ]);
        const player = gamePlayerCreate(TetrominosType.I, 5);
        const {x, y, rotate} = gameTransform(
            player,
            ([x, y]) => [x - 1, y + 2],
            rotateLeft
        );
        gamePlayerDrop({x, y, rotate, type: player.type}, buffer);

        expect(buffer).bufferEqual([
            '.....',
            '.i...',
            '.i...',
            '.i...',
            'OIOOO'
        ]);
    });
});

describe(gamePlayerTransform.name, () => {
    const buffer = bufferPattern(['.....', '.....', '.....', '.....', '.....']);

    it('should not translate the player', () => {
        const player = gamePlayerCreate(TetrominosType.T, 5);
        gamePlayerTransform(buffer, player, translateNoop, rotateNoop);
        const screen = gameScreenRender(buffer, player);
        expect(screen).screenEqual([
            '..t..',
            '.ttt.',
            '.....',
            '.....',
            '.....'
        ]);
    });

    it('should move player left', () => {
        const player = gamePlayerCreate(TetrominosType.T, 5);
        gamePlayerTransform(buffer, player, translateLeft, rotateNoop);
        const screen = gameScreenRender(buffer, player);
        expect(screen).screenEqual([
            '.t...',
            'ttt..',
            '.....',
            '.....',
            '.....'
        ]);
    });

    it('should move player right', () => {
        const player = gamePlayerCreate(TetrominosType.T, 5);
        gamePlayerTransform(buffer, player, translateRight, rotateNoop);
        const screen = gameScreenRender(buffer, player);
        expect(screen).screenEqual([
            '...t.',
            '..ttt',
            '.....',
            '.....',
            '.....'
        ]);
    });

    it('should rotate player left', () => {
        const player = gamePlayerCreate(TetrominosType.T, 5);
        gamePlayerTransform(buffer, player, translateNoop, rotateLeft);
        const screen = gameScreenRender(buffer, player);
        expect(screen).screenEqual([
            '..t..',
            '..tt.',
            '..t..',
            '.....',
            '.....'
        ]);
    });

    it('should rotate player right', () => {
        const player = gamePlayerCreate(TetrominosType.T, 5);
        gamePlayerTransform(buffer, player, translateNoop, rotateRight);
        const screen = gameScreenRender(buffer, player);
        expect(screen).screenEqual([
            '..t..',
            '.tt..',
            '..t..',
            '.....',
            '.....'
        ]);
    });
});
