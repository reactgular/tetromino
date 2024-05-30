import {SOUND_LEVEL, SOUND_SCORE} from '../components/particles/audio.types';
import {GameModel} from '../store/game/game-model';
import {GAME_PIECES, GamePiece} from './game-player';
import {TetrominosType} from './game-tetrominos';

const LEVEL_1_PER_LINE = {
    1: (n: number) => 40,
    2: (n: number) => 100,
    3: (n: number) => 300,
    4: (n: number) => 1200
};

const LEVEL_2_PER_LINE = {
    1: (n: number) => 80,
    2: (n: number) => 200,
    3: (n: number) => 600,
    4: (n: number) => 2400
};

const LEVEL_3_PER_LINE = {
    1: (n: number) => 120,
    2: (n: number) => 300,
    3: (n: number) => 900,
    4: (n: number) => 3600
};

const LEVEL_N_PER_LINE = {
    1: (n: number) => 40 * (n + 1),
    2: (n: number) => 100 * (n + 1),
    3: (n: number) => 300 * (n + 1),
    4: (n: number) => 1200 * (n + 1)
};

/**
 * Calculates the score for lines cleared.
 */
export const gamePointsLines = (
    level: number,
    lines: 0 | 1 | 2 | 3 | 4
): number => {
    if (lines !== 0) {
        if (level === 1) {
            return LEVEL_1_PER_LINE[lines](level);
        } else if (level === 2) {
            return LEVEL_2_PER_LINE[lines](level);
        } else if (level >= 3 && level < 10) {
            return LEVEL_3_PER_LINE[lines](level);
        } else if (level >= 10) {
            return LEVEL_N_PER_LINE[lines](level);
        }
    }
    return 0;
};

/**
 * Calculates the score for soft dropping a piece.
 */
export const gamePointsPiece = (piece: GamePiece): number => {
    return piece.length;
};

/**
 * Calculates the score for landing a piece.
 */
export const gamePoints = (
    level: number,
    type: TetrominosType,
    lines: 0 | 1 | 2 | 3 | 4
): number => {
    const lineScore = gamePointsLines(level, lines);
    const pieceScore = gamePointsPiece(GAME_PIECES[type][0]);
    return lineScore + pieceScore;
};

export type GameScore = Pick<
    GameModel,
    | 'score'
    | 'level'
    | 'lines_level'
    | 'lines_level_up'
    | 'lines_total'
    | 'player_freeze'
>;

/**
 * Computes the score and level changes for a collision.
 */
export const gameScore = (
    state: GameScore,
    type: TetrominosType,
    lines: 0 | 1 | 2 | 3 | 4
): string | undefined => {
    state.score = state.score + gamePoints(state.level, type, lines!);
    state.lines_level = state.lines_level + lines!;
    if (state.lines_level >= state.lines_level_up) {
        state.lines_total += state.lines_level;
        state.lines_level = 0;
        state.level++;
        return SOUND_LEVEL;
    }
    if (!state.player_freeze) {
        return SOUND_SCORE;
    }
};
