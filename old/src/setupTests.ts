// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import {bufferEmpty, bufferEqual, bufferSize} from './tests/expect-game-buffer';
import {rowEmpty, rowRemoved, rowWidth} from './tests/expect-game-row';
import {screenEqual} from './tests/expect-game-screen';

declare global {
    namespace jest {
        interface Matchers<R> {
            bufferEmpty(): R;

            bufferEqual(pattern: Array<string>): R;

            bufferSize(width: number, height: number): R;

            rowEmpty(): R;

            rowRemoved(): R;

            rowWidth(width: number): R;

            screenEqual(pattern: Array<string>): R;
        }
    }
}

expect.extend({
    bufferEmpty,
    bufferEqual,
    bufferSize,
    rowEmpty,
    rowWidth,
    rowRemoved,
    screenEqual
});
