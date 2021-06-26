import {gamePlayerCreate} from '../../engine/game-player';
import {gameScreenRender} from '../../engine/game-screen';
import {TetrominosType} from '../../engine/game-tetrominos';
import {gameTickPlayer, gameTickRows} from '../../engine/game-tick';
import {bufferPattern, screenToStr} from '../expect-utils';

describe(gameTickPlayer.name, () => {
    it('should return true if player was moved', () => {
        const buffer = bufferPattern([
            '.....',
            '.....',
            '.....',
            '.....',
            '.....'
        ]);
        const player = gamePlayerCreate(TetrominosType.O, 5);
        const moved = gameTickPlayer(buffer, player);
        const screen = gameScreenRender(buffer, player);

        expect(moved).toEqual(true);
        expect(screenToStr(screen)).toEqual('......oo...oo............');
    });

    it('should return false if player was baked into buffer', () => {
        const buffer = bufferPattern(['.....', '.....']);
        const player = gamePlayerCreate(TetrominosType.O, 5);
        const moved = gameTickPlayer(buffer, player);
        expect(moved).toEqual(false);
        expect(buffer).bufferEqual(['.oo..', '.oo..']);
    });
});

describe(gameTickRows.name, () => {
    it('should return true if rows were removed', () => {
        const buffer = bufferPattern([
            '.....',
            '.....',
            'ooooo',
            'iiiii',
            'ttttt'
        ]);

        expect(gameTickRows(buffer)).toEqual(true);
        expect(buffer).bufferEqual([
            '.....',
            '.....',
            '.....',
            'IIIII',
            'TTTTT'
        ]);

        expect(gameTickRows(buffer)).toEqual(true);
        expect(buffer).bufferEqual([
            '.....',
            '.....',
            '.....',
            '.....',
            'TTTTT'
        ]);

        expect(gameTickRows(buffer)).toEqual(true);
        expect(buffer).bufferEqual([
            '.....',
            '.....',
            '.....',
            '.....',
            '.....'
        ]);
    });

    it('should return false if no rows were removed', () => {
        const buffer = bufferPattern([
            '.....',
            '.....',
            '.....',
            '.....',
            '.....'
        ]);

        expect(gameTickRows(buffer)).toEqual(false);
    });
});
