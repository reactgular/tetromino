import {FC, useEffect} from 'react';

export interface KeyPressedProps {
    keyCode: string;

    onPress?: () => void;

    onRelease?: () => void;
}

export const KeyPressed: FC<KeyPressedProps> = ({
    keyCode,
    onPress,
    onRelease
}) => {
    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            if (!e.repeat && e.code === keyCode) {
                if (e.type === 'keydown') {
                    onPress && onPress();
                }
                if (e.type === 'keyup') {
                    onRelease && onRelease();
                }
            }
        };

        document.addEventListener('keydown', listener);
        document.addEventListener('keyup', listener);
        return () => {
            document.removeEventListener('keydown', listener);
            document.removeEventListener('keyup', listener);
        };
    }, [keyCode, onPress, onRelease]);
    return null;
};
