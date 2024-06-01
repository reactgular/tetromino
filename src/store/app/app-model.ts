import {
    DEFAULT_KEY_BINDINGS,
    KeyBindings
} from '../../components/particles/key_bindings.types';
import {environment} from '../../environment/environment';

/**
 * Defines dialogs that can be shown.
 */
export enum AppDialogType {
    OPTIONS = 'options',
    HIGH_SCORES = 'high_scores',
    CREDITS = 'credits'
}

export interface AppModel {
    /**
     * Toggles dark mode for the theme.
     */
    dark: boolean;

    /**
     * Current visible dialog.
     */
    dialog?: AppDialogType;

    /**
     * Show a ghost of where a piece will land.
     */
    ghost_piece: boolean;

    /**
     * List of high scores.
     */
    high_scores: Array<number>;

    /**
     * Game keyboard bindings.
     */
    keys: KeyBindings;

    /**
     * Play music.
     */
    music: boolean;

    /**
     * Music track to play.
     */
    music_type: number;

    /**
     * Music volume.
     */
    music_volume: number;

    /**
     * Play sound effects.
     */
    sound: boolean;

    /**
     * Sound volume.
     */
    sound_volume: number;

    /**
     * Player's starting level.
     */
    start_level: number;
}

/**
 * Default state for the app.
 */
export const APP_INITIAL_STATE: AppModel = {
    dark: false,
    ghost_piece: true,
    high_scores: [],
    music: true,
    music_type: 0,
    music_volume: 80,
    sound: true,
    sound_volume: 80,
    start_level: 1,
    keys: DEFAULT_KEY_BINDINGS
};

/**
 * Selection of state properties to persist to localStorage along with a
 * version to track compatability.
 */
export type AppPersist = Pick<
    AppModel,
    | 'dark'
    | 'ghost_piece'
    | 'start_level'
    | 'sound'
    | 'sound_volume'
    | 'music'
    | 'music_volume'
    | 'music_type'
    | 'high_scores'
    | 'keys'
>;

export const APP_NAME = 'app';
