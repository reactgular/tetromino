import {TETROMINOS_TYPES} from '../../engine/game-tetrominos';

export const rand = (max: number) => Math.floor(Math.random() * max);

export const range = (min: number, max: number) => rand(max - min) + min;

export const randTetro = () => TETROMINOS_TYPES[rand(TETROMINOS_TYPES.length)];

export const randTetros = (count: number) =>
    Array(count).fill(null).map(randTetro);
