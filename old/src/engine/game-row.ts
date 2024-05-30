import {gameBufferCells, GameCell} from './game-cell';

/**
 * Defines a row across the screen.
 */
export interface GameRow {
    cells: Array<GameCell>;

    removed?: boolean;
}

/**
 * Generates an empty collection of rows.
 */
export function* gameBufferRows(
    width: number,
    height: number
): IterableIterator<GameRow> {
    for (let i = 0; i < height; i++) {
        yield {cells: Array.from(gameBufferCells(width))};
    }
}
