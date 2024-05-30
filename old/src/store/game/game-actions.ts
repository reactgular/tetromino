import {createAction} from '@reduxjs/toolkit';
import {GameBuffer} from '../../engine/game-buffer';
import {GameCellPatch} from '../../engine/game-cell';
import {GamePlayerDirection} from '../../engine/game-transform';
import {GAME_NAME, GameModel} from './game-model';

export namespace GameActions {
    const prefix = (name: string) => `${GAME_NAME}/${name}`;

    /**
     * Toggles fast mode.
     */
    export const softDrop = createAction<boolean>(prefix('soft_drop'));

    /**
     * Performs a hard drop of the piece.
     */
    export const hardDrop = createAction(prefix('hard_drop'));

    /**
     * Starts a new game at a given level.
     */
    export const start = createAction<number>(prefix('start'));

    /**
     * Resumes running the game loop.
     */
    export const run = createAction(prefix('run'));

    /**
     * Pauses the game.
     */
    export const pause = createAction(prefix('pause'));

    /**
     * Resumes a paused game.
     */
    export const resume = createAction(prefix('resume'));

    /**
     * Quits the game.
     */
    export const quit = createAction(prefix('quit'));

    /**
     * Animation tick that moves game state forward.
     */
    export const tick = createAction(prefix('tick'));

    /**
     * Animation tick that moves game state forward.
     */
    export const finishing = createAction(prefix('finishing'));

    /**
     * Updates the screen with buffer changes.
     */
    export const render = createAction(prefix('render'));

    /**
     * Sets the current buffer.
     * No width/height check is done.
     */
    export const bufferSet = createAction<GameBuffer>(prefix('bufferSet'));

    /**
     * Sets a buffer cell.
     * For performance, no out of range check is done.
     */
    export const bufferPatch = createAction<Array<GameCellPatch>>(
        prefix('bufferPatch')
    );

    /**
     * Allows tests to externally modifying game state.
     */
    export const patch = createAction<Partial<GameModel>>(prefix('patch'));

    /**
     * Rotates the current piece.
     */
    export const rotate = createAction<GamePlayerDirection>(prefix('rotate'));

    /**
     * Moves the current piece towards left or right.
     */
    export const move = createAction<GamePlayerDirection>(prefix('move'));

    /**
     * Swaps a piece with the stash.
     */
    export const hold = createAction(prefix('hold'));

    /**
     * Removes a finished sound track from the play list.
     */
    export const soundTrack = createAction<number>(prefix('soundTrack'));

    /**
     * Sets the toast message.
     */
    export const toast = createAction<string | undefined>(prefix('toast'));
}
