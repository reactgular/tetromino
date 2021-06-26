import {TetrominosType} from './game-tetrominos';

export const GHOST_OPACITY = 0.2;

/**
 * Defines a single block on the screen. If the type is undefined the cell is
 * empty.
 */
export interface GameCell {
    ghost?: number;

    glow?: boolean;

    type?: TetrominosType;
}

/**
 * Defines coordinates to change a single block in the buffer.
 */
export interface GameCellPatch extends GameCell {
    x: number;

    y: number;
}

/**
 * Generates a collection of empty cells.
 */
export function* gameBufferCells(width: number): IterableIterator<GameCell> {
    for (let i = 0; i < width; i++) {
        yield {};
    }
}
