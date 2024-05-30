import {createSelector} from '@reduxjs/toolkit';
import {selectRoot} from '../select-root';
import {GameStatus, NextTetrominos} from './game-model';

export namespace GameSelectors {
    /**
     * Root game selector.
     */
    export const game = createSelector(selectRoot, (state) => state.game);

    const buffer = createSelector(game, (game) => game.buffer);
    const screen = createSelector(game, (game) => game.screen);

    /**
     * Status of the game engine.
     */
    export const status = createSelector(game, (game) => game.status);

    /**
     * show the welcome screen.
     */
    export const welcoming = createSelector(
        status,
        (status) => status === GameStatus.WELCOME
    );

    /**
     * Play finish animation.
     */
    export const finishing = createSelector(
        status,
        (status) => status === GameStatus.FINISHING
    );

    /**
     * Show the finished dialog.
     */
    export const finished = createSelector(
        status,
        (status) => status === GameStatus.FINISHED
    );

    /**
     * Show the paused dialog.
     */
    export const paused = createSelector(
        status,
        (status) => status === GameStatus.PAUSED
    );

    /**
     * Show the count down timer.
     */
    export const starting = createSelector(
        status,
        (status) => status === GameStatus.STARTING
    );

    /**
     * Run the game engine.
     */
    export const running = createSelector(
        status,
        (status) => status === GameStatus.RUNNING
    );

    /**
     * Selects current level.
     */
    export const level = createSelector(game, (game) => game.level);

    /**
     * Lines cleared by the player.
     */
    export const lines = createSelector(game, (game) => {
        return game.lines_total + game.lines_level;
    });

    /**
     * Changes to restart the game tick timer.
     */
    export const restartTicker = createSelector(
        game,
        (game) => game.restart_ticker
    );

    /**
     * Selects current score.
     */
    export const score = createSelector(game, (game) => game.score);

    /**
     * Selects the next piece.
     */
    export const next = createSelector(game, (game) => game.next);

    /**
     * Selects the piece being held.
     */
    export const hold = createSelector(
        game,
        (game) => (game.hold ? [game.hold] : [undefined]) as NextTetrominos
    );

    /**
     * Selects if hold is enabled.
     */
    export const holdEnabled = createSelector(game, (game) => game.hold_enable);

    /**
     * How fast input controls is repeated.
     */
    export const repeatSpeed = createSelector(
        game,
        (game) => game.repeat_speed
    );

    /**
     * Selects a specific cell on the screen.
     */
    export const screenCell = (indx: number) =>
        createSelector(screen, (screen) => screen[indx]);

    /**
     * Selects the game speed.
     */
    export const speed = createSelector(game, (game) => {
        if (game.soft_drop && game.player) {
            return game.fast_speed;
        }
        const speed = 500 - game.level * 20;
        return Math.max(game.fast_speed, speed);
    });

    /**
     * Selects the size of the buffer.
     */
    export const size = createSelector(buffer, ({width, height}) => [
        width,
        height
    ]);

    /**
     * Selects the CSS aspect ratio of the game board.
     * Includes padding adjustments.
     */
    export const aspectRatio = createSelector(
        size,
        ([width, height]) => `${width / height} / 0.9`
    );

    /**
     * Selects the sound tracks to play.
     */
    export const soundTracks = createSelector(
        game,
        (game) => game.sound_tracks
    );

    /**
     * Selects a toast message for the player.
     */
    export const toastMessage = createSelector(
        game,
        (game) => game.toast_message
    );
}
