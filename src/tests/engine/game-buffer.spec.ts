import {
    gameBufferEmpty,
    gameBufferFindRemoved,
    gameBufferPatch,
    gameBufferRemoveRow,
    gameBufferRowSolid
} from '../../engine/game-buffer';
import {gameScreenFlatten} from '../../engine/game-screen';
import {TETROMINOS_TYPES, TetrominosType} from '../../engine/game-tetrominos';
import {bufferPattern} from '../expect-utils';

describe(gameBufferEmpty.name, () => {
    it('should create an empty buffer', () => {
        const fixtures = [
            [10, 10],
            [0, 0],
            [10, 20],
            [20, 10]
        ];
        fixtures.forEach(([width, height]) => {
            const buffer = gameBufferEmpty(width, height);
            expect(buffer).bufferSize(width, height);
            expect(buffer).bufferEmpty();
            buffer.rows.forEach((row) => {
                expect(row).not.rowRemoved();
                expect(row).rowWidth(width);
                expect(row).rowEmpty();
            });
        });
    });
});

describe(gameBufferPatch.name, () => {
    const fixtures = [
        [10, 20],
        [3, 9],
        [20, 10]
    ];
    it('should modify each cell of the buffer', () => {
        fixtures.forEach(([width, height]) => {
            TETROMINOS_TYPES.forEach((type) => {
                const buffer = gameBufferEmpty(width, height);
                expect(buffer).bufferSize(width, height);
                expect(buffer).bufferEmpty();

                for (let y = 0; y < height; y++) {
                    for (let x = 0; x < width; x++) {
                        expect(buffer.rows[y].cells[x]).toStrictEqual({});
                        gameBufferPatch(buffer, {x, y, type});
                        expect(buffer.rows[y].cells[x]).toStrictEqual({type});
                    }
                }
            });
        });
    });
});

describe(gameBufferRowSolid.name, () => {
    it('should return false for an empty row', () => {
        expect(gameBufferRowSolid({cells: [{}, {}, {}, {}]})).toEqual(false);
    });
    it('should return false for a partial row', () => {
        expect(
            gameBufferRowSolid({
                cells: [
                    {type: TetrominosType.Z},
                    {type: TetrominosType.O},
                    {},
                    {type: TetrominosType.S}
                ]
            })
        ).toEqual(false);
    });
    it('should return true for a solid row of same types', () => {
        expect(
            gameBufferRowSolid({
                cells: [
                    {type: TetrominosType.Z},
                    {type: TetrominosType.Z},
                    {type: TetrominosType.Z},
                    {type: TetrominosType.Z}
                ]
            })
        ).toEqual(true);
    });
    it('should return true for a solid row of different types', () => {
        expect(
            gameBufferRowSolid({
                cells: [
                    {type: TetrominosType.Z},
                    {type: TetrominosType.O},
                    {type: TetrominosType.I},
                    {type: TetrominosType.S}
                ]
            })
        ).toEqual(true);
    });
});

describe(gameBufferFindRemoved.name, () => {
    it('should find row marked for removal', () => {
        const buffer = gameBufferEmpty(5, 5);
        expect(gameBufferFindRemoved(buffer)).toEqual(-1);
        buffer.rows[3].removed = true;
        expect(buffer.rows[3]).rowRemoved();
        expect(gameBufferFindRemoved(buffer)).toEqual(3);
    });

    it('should find first row marked for removal', () => {
        const buffer = gameBufferEmpty(5, 5);
        expect(gameBufferFindRemoved(buffer)).toEqual(-1);
        buffer.rows[2].removed = true;
        buffer.rows[3].removed = true;
        buffer.rows[4].removed = true;
        expect(buffer.rows[2]).rowRemoved();
        expect(buffer.rows[3]).rowRemoved();
        expect(buffer.rows[4]).rowRemoved();
        expect(gameBufferFindRemoved(buffer)).toEqual(2);
    });

    it('should return -1 for none found', () => {
        const buffer = gameBufferEmpty(5, 5);
        expect(buffer.rows[0]).not.rowRemoved();
        expect(buffer.rows[1]).not.rowRemoved();
        expect(buffer.rows[2]).not.rowRemoved();
        expect(buffer.rows[3]).not.rowRemoved();
        expect(buffer.rows[4]).not.rowRemoved();
        expect(gameBufferFindRemoved(buffer)).toEqual(-1);
    });
});

describe(gameBufferRemoveRow.name, () => {
    it('should remove a bottom row and insert a top row', () => {
        const buffer = bufferPattern([
            '..o..',
            '.ooo.',
            'ooooo',
            '.ooo.',
            '..o..'
        ]);
        gameBufferRemoveRow(buffer, 4);
        expect(buffer).bufferEqual([
            '.....',
            '..o..',
            '.ooo.',
            'ooooo',
            '.ooo.'
        ]);
    });

    it('should remove top row and insert a top row', () => {
        const buffer = bufferPattern([
            '..o..',
            '.ooo.',
            'ooooo',
            '.ooo.',
            '..o..'
        ]);
        gameBufferRemoveRow(buffer, 0);
        expect(buffer).bufferEqual([
            '.....',
            '.ooo.',
            'ooooo',
            '.ooo.',
            '..o..'
        ]);
    });

    it('should remove middle row and insert a top row', () => {
        const buffer = bufferPattern([
            '..o..',
            '.ooo.',
            'ooooo',
            '.ooo.',
            '..o..'
        ]);
        gameBufferRemoveRow(buffer, 2);
        expect(buffer).bufferEqual([
            '.....',
            '..o..',
            '.ooo.',
            '.ooo.',
            '..o..'
        ]);
    });

    it('should remove bottom 3 rows and insert a top row', () => {
        const buffer = bufferPattern([
            '..o..',
            '.ooo.',
            'ooooo',
            '.ooo.',
            '..o..'
        ]);
        gameBufferRemoveRow(buffer, 4);
        gameBufferRemoveRow(buffer, 4);
        gameBufferRemoveRow(buffer, 4);
        expect(buffer).bufferEqual([
            '.....',
            '.....',
            '.....',
            '..o..',
            '.ooo.'
        ]);
    });
});
