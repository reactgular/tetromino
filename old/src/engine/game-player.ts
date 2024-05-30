import {GameBuffer, gameBufferRowSolid} from './game-buffer';
import {gameCollision} from './game-collision';
import {
    PIECE_I,
    PIECE_J,
    PIECE_L,
    PIECE_O,
    PIECE_S,
    PIECE_T,
    PIECE_Z
} from './game-pieces';
import {GameRow} from './game-row';
import {TetrominosType} from './game-tetrominos';
import {GameRotator, gameTransform, GameTranslator} from './game-transform';

/**
 * Defines a player piece with location.
 */
export interface GamePlayer {
    rotate: number;

    type: TetrominosType;

    x: number;

    y: number;
}

/**
 * Defines a ghost piece location.
 */
export type GameGhost = Pick<GamePlayer, 'x' | 'y'>;

/**
 * An array from the GameDesigner.
 */
export type GamePiece = Array<[number, number]>;

/**
 * A single game piece in different rotations.
 */
export type GamePieceRotations = Array<GamePiece>;

/**
 * Map of game pieces grouped by their type.
 */
export const GAME_PIECES: Record<string, GamePieceRotations> = {
    [TetrominosType.O]: PIECE_O,
    [TetrominosType.I]: PIECE_I,
    [TetrominosType.S]: PIECE_S,
    [TetrominosType.Z]: PIECE_Z,
    [TetrominosType.L]: PIECE_L,
    [TetrominosType.J]: PIECE_J,
    [TetrominosType.T]: PIECE_T
};

/**
 * Creates a player piece in the center of the buffer. Piece is positioned
 * as close as possible to the top of the buffer.
 */
export function gamePlayerCreate(
    type: TetrominosType,
    width: number
): GamePlayer {
    const piece = GAME_PIECES[type][0];
    const y = piece.some(([offset_x, offset_y]) => offset_y < 0) ? 1 : 0;
    return {
        x: Math.floor(width / 2),
        y,
        type,
        rotate: 0
    };
}

/**
 * Bakes the player's piece into the buffer.
 */
export function gamePlayerDrop(
    {x, y, type, rotate}: GamePlayer,
    buffer: GameBuffer
): 0 | 1 | 2 | 3 | 4 {
    const piece = GAME_PIECES[type][rotate];
    const rows = new Set<GameRow>();
    for (let i = 0; i < piece.length; i++) {
        const [offset_x, offset_y] = piece[i];
        const row = buffer.rows[y + offset_y];
        row.cells[x + offset_x] = {type};
        rows.add(row);
    }
    let lines = 0;
    rows.forEach((row) => {
        if (gameBufferRowSolid(row)) {
            row.removed = true;
            lines++;
        }
    });
    return lines as 0 | 1 | 2 | 3 | 4;
}

/**
 * Moves/rotates a player only if there is no collision.
 */
export function gamePlayerTransform(
    buffer: GameBuffer,
    player: GamePlayer,
    translator: GameTranslator,
    rotator: GameRotator
) {
    const trans = gameTransform(player, translator, rotator);
    if (!gameCollision(trans, buffer)) {
        player.rotate = trans.rotate;
        player.x = trans.x;
        player.y = trans.y;
    }
}
