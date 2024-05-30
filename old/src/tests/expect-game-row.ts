import {GameRow} from '../engine/game-row';
import {expectMessage} from './expect-utils';

export function rowEmpty(this: jest.MatcherContext, row: GameRow) {
    const pass = row.cells.every((cell) => cell.type === undefined);
    return expectMessage(this, 'expected row to {not} be empty', pass);
}

export function rowWidth(
    this: jest.MatcherContext,
    row: GameRow,
    width: number
) {
    const pass = row.cells.length === width;
    return expectMessage(this, `expected row width to {not} be ${width}`, pass);
}

export function rowRemoved(this: jest.MatcherContext, row: GameRow) {
    const pass = row.removed === true;
    return expectMessage(this, `expected row to {not} be removed`, pass);
}
