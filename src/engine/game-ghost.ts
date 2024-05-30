import {GameBuffer} from './game-buffer';
import {gameCollision} from './game-collision';
import {GameGhost, GamePlayer} from './game-player';
import {gameTransform, rotateNoop, translateDown} from './game-transform';

/**
 * Drops a piece to find the ghost location.
 */
export const gameGhost = (
    buffer: GameBuffer,
    {x, y, type, rotate}: GamePlayer
): GameGhost | undefined => {
    let ghost: GameGhost | undefined;
    while (true) {
        const trans = gameTransform(
            {x: ghost?.x || x, y: ghost?.y || y, type, rotate},
            translateDown,
            rotateNoop
        );
        if (gameCollision(trans, buffer)) {
            return ghost;
        } else {
            ghost = {x: trans.x, y: trans.y};
        }
    }
};
