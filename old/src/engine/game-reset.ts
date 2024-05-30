import {randTetros} from '../components/particles/utilities.types';
import {GAME_INITIAL_STATE, GameModel} from '../store/game/game-model';
import {gameBufferEmpty} from './game-buffer';

export const BUFFER_WIDTH = 10;

export const BUFFER_HEIGHT = 20;

export const gameReset = (next_max: number): GameModel => {
    const buffer = gameBufferEmpty(BUFFER_WIDTH, BUFFER_HEIGHT);
    return {
        ...GAME_INITIAL_STATE,
        next: randTetros(next_max),
        buffer: buffer,
        screen: Array(buffer.width * buffer.height).fill({}),
        level: 1,
        score: 0,
        player: undefined,
        ghost: undefined
    };
};
