import {GameBuffer} from '../engine/game-buffer';
import {GameRow} from '../engine/game-row';
import {expectMessage} from './expect-utils';

export function bufferEmpty(this: jest.MatcherContext, buffer: GameBuffer) {
    const pass = buffer.rows.every((row) =>
        row.cells.every((cell) => cell.type === undefined)
    );
    return expectMessage(this, 'expected buffer to {not} be empty', pass);
}

export function bufferSize(
    this: jest.MatcherContext,
    buffer: GameBuffer,
    width: number,
    height: number
) {
    const pass =
        width === buffer.width &&
        height === buffer.height &&
        buffer.rows.length === height;
    return expectMessage(
        this,
        `expected buffer size to {not} be [${width}, ${height}]`,
        pass
    );
}

export function bufferEqual(
    this: jest.MatcherContext,
    buffer: GameBuffer,
    expect: Array<string>
) {
    let pass = false;
    if (
        buffer.height === expect.length &&
        buffer.rows.length === expect.length
    ) {
        pass = buffer.rows.reduce(
            (acc: boolean, next: GameRow, indx: number) => {
                const pattern = next.cells
                    .map((cell) =>
                        cell.type === undefined ? '.' : (cell.type as string)
                    )
                    .join('');
                const value = next.removed ? pattern.toUpperCase() : pattern;
                return value === expect[indx];
            },
            false
        );
    }
    return expectMessage(this, `expected buffer to {not} equal pattern`, pass);
}
