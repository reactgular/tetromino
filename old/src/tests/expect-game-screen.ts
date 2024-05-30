import {GameScreen} from '../engine/game-screen';
import {expectMessage} from './expect-utils';

export function screenEqual(
    this: jest.MatcherContext,
    screen: GameScreen,
    expect: Array<string>
) {
    const expectStr = expect.join('');
    const screenStr = screen
        .map(
            (cell) => (cell.glow ? cell.type?.toUpperCase() : cell.type) || '.'
        )
        .join('');
    return expectMessage(
        this,
        `expected screen to {not} equal pattern`,
        screenStr === expectStr
    );
}
