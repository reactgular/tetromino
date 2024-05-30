import {
    GameBuffer,
    gameBufferFindRemoved,
    gameBufferRemoveRow
} from './game-buffer';
import {gameCollision} from './game-collision';
import {GamePlayer, gamePlayerDrop} from './game-player';
import {gameTransform, rotateNoop, translateDown} from './game-transform';

/**
 * Results of moving the player's piece.
 */
export interface GameTickResult {
    /**
     * Was the piece dropped into the buffer?
     */
    collision: boolean;

    /**
     * (when collision is true) number of lines flagged for removal.
     */
    lines?: 0 | 1 | 2 | 3 | 4;
}

/**
 * Performs a single frame of animation of the player piece moving.
 */
export function gameTickPlayer(
    buffer: GameBuffer,
    player: GamePlayer
): GameTickResult {
    const trans = gameTransform(player, translateDown, rotateNoop);
    if (gameCollision(trans, buffer)) {
        const lines = gamePlayerDrop(player, buffer);
        return {collision: true, lines};
    }
    player.y = trans.y;
    return {collision: false};
}

/**
 * Drops the play down all the way until collision.
 */
export function gameDropPlayer(buffer: GameBuffer, player: GamePlayer) {
    while (true) {
        const trans = gameTransform(player, translateDown, rotateNoop);
        if (gameCollision(trans, buffer)) {
            break;
        } else {
            player.y = trans.y;
        }
    }
}

/**
 * Performs a single frame of animation of the rows collapsing down by gravity.
 */
export function gameTickRows(buffer: GameBuffer): boolean {
    const removeIndex = gameBufferFindRemoved(buffer);
    if (removeIndex === -1) {
        return false;
    }
    gameBufferRemoveRow(buffer, removeIndex);
    return true;
}
