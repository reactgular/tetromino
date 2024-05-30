import {
    GAME_PIECES,
    GamePiece,
    GamePieceRotations,
    GamePlayer
} from './game-player';

/**
 * Defines a piece after it's been transformed.
 */
export interface GameTransform {
    piece: GamePiece;

    rotate: number;

    x: number;

    y: number;
}

/**
 * Defines player directions they can move/rotate.
 */
export enum GamePlayerDirection {
    LEFT = 'left',
    RIGHT = 'right'
}

/**
 * Defines a function that can move a piece.
 */
export type GameTranslator = (p: [number, number]) => [number, number];

/**
 * Defines a function that can rotate a piece.
 */
export type GameRotator = (
    pieces: GamePieceRotations,
    rotate: number
) => number;

/**
 * Moves a piece up.
 */
export const translateUp: GameTranslator = ([x, y]: [number, number]): [
    number,
    number
] => [x, y - 1];

/**
 * Moves a piece down.
 */
export const translateDown: GameTranslator = ([x, y]: [number, number]): [
    number,
    number
] => [x, y + 1];

/**
 * Moves a piece left.
 */
export const translateLeft: GameTranslator = ([x, y]: [number, number]): [
    number,
    number
] => [x - 1, y];

/**
 * Moves a piece right.
 */
export const translateRight: GameTranslator = ([x, y]: [number, number]): [
    number,
    number
] => [x + 1, y];

/**
 * Does not move a piece.
 */
export const translateNoop: GameTranslator = (
    coords: [number, number]
): [number, number] => coords;

/**
 * Rotates a piece left.
 */
export const rotateLeft: GameRotator = (
    pieces: GamePieceRotations,
    rotate: number
): number => {
    return rotate === pieces.length - 1 ? 0 : rotate + 1;
};

/**
 * Rotates a piece right.
 */
export const rotateRight: GameRotator = (
    pieces: GamePieceRotations,
    rotate: number
): number => {
    return rotate === 0 ? pieces.length - 1 : rotate - 1;
};

/**
 * Does not rotate a piece.
 */
export const rotateNoop: GameRotator = (
    pieces: GamePieceRotations,
    rotate: number
): number => {
    return rotate;
};

/**
 * Maps to a translate function.
 */
export const translateDirection = {
    [GamePlayerDirection.LEFT]: translateLeft,
    [GamePlayerDirection.RIGHT]: translateRight
};

/**
 * Maps to a rotate function.
 */
export const rotateDirection = {
    [GamePlayerDirection.LEFT]: rotateLeft,
    [GamePlayerDirection.RIGHT]: rotateRight
};

/**
 * Transforms a game piece by applying a position and rotation translator.
 */
export function gameTransform(
    {x, y, type, rotate}: GamePlayer,
    trans: GameTranslator,
    rot: GameRotator
): GameTransform {
    const pieces = GAME_PIECES[type];
    const trans_rot = rot(pieces, rotate);
    const [trans_x, trans_y] = trans([x, y]);
    return {
        x: trans_x,
        y: trans_y,
        piece: pieces[trans_rot],
        rotate: trans_rot
    };
}
