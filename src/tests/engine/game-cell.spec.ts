import {gameBufferCells} from '../../engine/game-cell';

describe(gameBufferCells.name, () => {
    it('should generate a collection of empty cells', () => {
        const cells = Array.from(gameBufferCells(10));
        expect(cells.length).toBe(10);
        cells.forEach((cell) => expect(cell).toStrictEqual({}));
    });
    it('should generate an empty array', () => {
        const cells1 = Array.from(gameBufferCells(0));
        expect(cells1.length).toBe(0);
        const cells2 = Array.from(gameBufferCells(-1));
        expect(cells2.length).toBe(0);
    });
});
