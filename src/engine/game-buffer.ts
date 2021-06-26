import {gameBufferCells, GameCellPatch} from './game-cell';
import {gameBufferRows, GameRow} from './game-row';

/**
 * Defines the game memory for all the blocks that are locked into place.
 */
export interface GameBuffer {
    height: number;

    rows: Array<GameRow>;

    width: number;
}

/**
 * Creates a buffer with empty cells.
 */
export function gameBufferEmpty(width: number, height: number): GameBuffer {
    const rows = Array.from(gameBufferRows(width, height));
    return {rows, width, height};
}

/**
 * Copies cells into a buffer.
 */
export function gameBufferPatch(buffer: GameBuffer, patch: GameCellPatch) {
    const {x, y, ...cell} = patch;
    buffer.rows[y].cells[x] = cell;
}

/**
 * True if the entire row is filled with blocks.
 */
export function gameBufferRowSolid({cells}: GameRow): boolean {
    return cells.every((cell) => Boolean(cell.type));
}

/**
 * True if some of the row is has blocks.
 */
export function gameBufferRowSome({cells}: GameRow): boolean {
    return cells.some((cell) => Boolean(cell.type));
}

/**
 * Counts how many solid blocks on a row.
 */
export function gameBufferRowCount({cells}: GameRow): number {
    return cells.filter((cell) => Boolean(cell.type)).length;
}

/**
 * Finds the index of the first removed row. Returns -1 if none found.
 */
export function gameBufferFindRemoved({rows}: GameBuffer): number {
    return rows.findIndex((row) => row.removed);
}

/**
 * Removes a row and inserts a blank at the top of the buffer.
 */
export function gameBufferRemoveRow({rows, width}: GameBuffer, indx: number) {
    rows.splice(indx, 1);
    rows.unshift({cells: Array.from(gameBufferCells(width))});
}
