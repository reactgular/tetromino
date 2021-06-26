/**
 * Creates an expect message that supports inverted NOT
 */
import {
    GameBuffer,
    gameBufferEmpty,
    gameBufferRowSolid
} from '../engine/game-buffer';
import {GameScreen} from '../engine/game-screen';
import {TetrominosType} from '../engine/game-tetrominos';

export function expectMessage(
    {isNot}: jest.MatcherContext,
    message: string,
    pass: boolean
): jest.CustomMatcherResult {
    message = isNot
        ? message.replace('{not}', 'not')
        : message.replace('{not}', '');
    return {
        message: () => message.replace(/\s+/g, ' '),
        pass
    };
}

/**
 * Creates a buffer from strings.
 */
export function bufferPattern(rows: Array<string>): GameBuffer {
    expect(rows.length).toBeGreaterThan(0);

    const height = rows.length;
    const width = rows[0].length;
    const buffer = gameBufferEmpty(width, height);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            expect(rows[y].length).toEqual(width);

            const type = rows[y][x];
            buffer.rows[y].cells[x].type =
                type === '.' ? undefined : (type as TetrominosType);
        }
        buffer.rows[y].removed = gameBufferRowSolid(buffer.rows[y]);
    }

    return buffer;
}

/**
 * Converts a screen to a string.
 */
export function screenToStr(screen: GameScreen): string {
    return screen
        .map(
            (cell) => (cell.glow ? cell.type?.toUpperCase() : cell.type) || '.'
        )
        .join('');
}
