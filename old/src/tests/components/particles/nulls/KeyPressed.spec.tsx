import {fireEvent, render} from '@testing-library/react';
import {KeyPressed} from '../../../../components/particles/nulls/KeyPressed';

describe(KeyPressed.name, () => {
    let onPress: jest.Mock, onRelease: jest.Mock;
    const key = 'ArrowLeft';
    const code = 'ArrowLeft';
    const repeat = true;

    beforeEach(() => {
        onPress = jest.fn(() => undefined);
        onRelease = jest.fn(() => undefined);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should bind and unbind event listeners', () => {
        jest.spyOn(document, 'addEventListener');
        jest.spyOn(document, 'removeEventListener');

        const {unmount} = render(
            <KeyPressed keyCode={key} onPress={onPress} onRelease={onRelease} />
        );

        expect(document.addEventListener).toBeCalledWith(
            'keydown',
            expect.any(Function)
        );
        expect(document.addEventListener).toBeCalledWith(
            'keyup',
            expect.any(Function)
        );
        expect(document.removeEventListener).not.toBeCalled();

        unmount();

        expect(document.removeEventListener).toBeCalledWith(
            'keydown',
            expect.any(Function)
        );
        expect(document.removeEventListener).toBeCalledWith(
            'keyup',
            expect.any(Function)
        );
    });

    it('should emit onPress events', () => {
        const {unmount} = render(
            <KeyPressed keyCode={key} onPress={onPress} onRelease={onRelease} />
        );

        fireEvent.keyDown(document, {key, code});

        expect(onPress).toHaveBeenCalledTimes(1);

        unmount();
    });

    it('should emit onRelease events', () => {
        const {unmount} = render(
            <KeyPressed keyCode={key} onPress={onPress} onRelease={onRelease} />
        );

        fireEvent.keyUp(document, {key});

        expect(onRelease).toHaveBeenCalledTimes(1);

        unmount();
    });

    it('should ignore keys repeating events', () => {
        const {unmount} = render(
            <KeyPressed keyCode={key} onPress={onPress} onRelease={onRelease} />
        );

        fireEvent.keyDown(document, {key});
        fireEvent.keyDown(document, {key, repeat});
        fireEvent.keyDown(document, {key, repeat});
        fireEvent.keyDown(document, {key, repeat});
        fireEvent.keyDown(document, {key, repeat});
        fireEvent.keyDown(document, {key, repeat});
        fireEvent.keyDown(document, {key, repeat});
        fireEvent.keyUp(document, {key});

        expect(onPress).toHaveBeenCalledTimes(1);
        expect(onRelease).toHaveBeenCalledTimes(1);

        unmount();
    });
});
