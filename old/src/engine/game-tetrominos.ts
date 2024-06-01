/**
 * Defines all the game pieces.
 */
export enum TetrominosType {
    I = 'i',
    O = 'o',
    T = 't',
    S = 's',
    Z = 'z',
    J = 'j',
    L = 'l'
}

/**
 * An array of game piece letters.
 */
export const TETROMINOS_TYPES = Object.values(TetrominosType);
