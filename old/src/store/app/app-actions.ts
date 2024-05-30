import {createAction} from '@reduxjs/toolkit';
import {KeyBindings} from '../../components/particles/key_bindings.types';
import {APP_NAME, AppDialogType, AppPersist} from './app-model';

export namespace AppActions {
    const prefix = (name: string) => `${APP_NAME}/${name}`;

    /**
     * Toggle dark  mode.
     */
    export const dark = createAction<boolean | undefined>(prefix('dark'));

    /**
     * Toggle ghost piece.
     */
    export const ghostPiece = createAction<boolean | undefined>(
        prefix('ghost_piece')
    );

    /**
     * Toggle playing of music.
     */
    export const music = createAction<boolean | undefined>(prefix('music'));

    /**
     * Changes the music track.
     */
    export const musicType = createAction<number>(prefix('music_type'));

    /**
     * Changes the music volume.
     */
    export const musicVolume = createAction<number>(prefix('music_volume'));

    /**
     * Toggle playing of sound effects.
     */
    export const sound = createAction<boolean | undefined>(prefix('sound'));

    /**
     * Changes the sound effects volume.
     */
    export const soundVolume = createAction<number>(prefix('sound_volume'));

    /**
     * Opens a dialog.
     */
    export const open = createAction<AppDialogType>(prefix('open'));

    /**
     * Closes currently open dialog.
     */
    export const close = createAction(prefix('close'));

    /**
     * Changes the player's starting level.
     */
    export const startLevel = createAction<number | undefined>(
        prefix('start_level')
    );

    /**
     * Adds a number to the high score board.
     */
    export const recordScore = createAction<number>(prefix('record_score'));

    /**
     * Resets the high score list.
     */
    export const resetScore = createAction(prefix('reset_store'));

    /**
     * Resets the app options.
     */
    export const resetOptions = createAction(prefix('reset_options'));

    /**
     * Patches the key bindings.
     */
    export const keys = createAction<{keyOf: keyof KeyBindings; code: string}>(
        prefix('keys')
    );

    /**
     * Restores saved state from localStorage.
     */
    export const persist = createAction<AppPersist>(prefix('persist'));
}
