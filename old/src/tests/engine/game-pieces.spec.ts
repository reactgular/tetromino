import {
    PIECE_I,
    PIECE_J,
    PIECE_L,
    PIECE_O,
    PIECE_S,
    PIECE_T,
    PIECE_Z
} from '../../engine/game-pieces';

const PIECES = [PIECE_O, PIECE_I, PIECE_S, PIECE_Z, PIECE_L, PIECE_J, PIECE_T];

describe('GamePieces', () => {
    it('should all be the same shape', () => {
        // must at least 1 piece
        expect(PIECES.length).toBeGreaterThan(0);
        PIECES.forEach((rotations) => {
            // must have at least 1 rotation
            expect(rotations.length).toBeGreaterThanOrEqual(1);
            rotations.forEach((piece) => {
                // must have at least 1 piece
                expect(piece.length).toBeGreaterThan(0);
                piece.forEach((coords) => {
                    // must be two numbers
                    expect(coords.length).toEqual(2);
                    coords.forEach((offset) => {
                        // limit coords offset to 2
                        expect(Math.abs(offset)).toBeLessThanOrEqual(2);
                    });
                });
            });
        });
    });
});
