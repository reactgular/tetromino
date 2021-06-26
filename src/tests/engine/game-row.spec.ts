import {gameBufferRows} from '../../engine/game-row';

describe(gameBufferRows.name, () => {
    it('should generate rows of empty cells', () => {
        const fixture = [
            [10, 20],
            [1, 1],
            [100, 1],
            [1, 100]
        ];
        fixture.forEach(([width, height]) => {
            const rows = Array.from(gameBufferRows(width, height));
            expect(rows.length).toBe(height);
            rows.forEach((row) => {
                expect(row.cells).not.toBeUndefined();
                expect(row.cells.length).toBe(width);
                row.cells.forEach((cell) => expect(cell).toStrictEqual({}));
            });
        });
    });
    it('should generate a zero sized buffer', () => {
        const fixture = [
            [0, 0],
            [20, 0],
            [0, -1],
            [20, -1],
            [-1, -1]
        ];
        fixture.forEach(([width, height]) => {
            const buffer = Array.from(gameBufferRows(width, height));
            expect(buffer.length).toBe(0);
        });
    });
});
