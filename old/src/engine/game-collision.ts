import {GameBuffer} from './game-buffer';
import {GameTransform} from './game-transform';

/**
 * Checks if a coordinate is inside the buffer.
 */
export function gameCollideBuffer(
    {width, height}: GameBuffer,
    x: number,
    y: number
): boolean {
    return x < 0 || x >= width || y < 0 || y >= height;
}

/**
 * Checks if a coordinate hits a block in the buffer.
 */
export function gameCollideBlock(
    {rows}: GameBuffer,
    x: number,
    y: number
): boolean {
    return rows[y].cells[x].type !== undefined;
}

/**
 * Checks if the coordinates of a piece cause any collision.
 */
export function gameCollision(
    {x, y, piece}: GameTransform,
    buffer: GameBuffer
): boolean {
    for (let i = 0; i < piece.length; i++) {
        const [offset_x, offset_y] = piece[i];
        const trans_x = x + offset_x;
        const trans_y = y + offset_y;
        if (
            gameCollideBuffer(buffer, trans_x, trans_y) ||
            gameCollideBlock(buffer, trans_x, trans_y)
        ) {
            return true;
        }
    }
    return false;
}
