import {FC, useEffect} from 'react';
import {
    KEY_BINDING_LABELS,
    KeyBindings
} from '../../particles/key_bindings.types';

export interface AppKeyPickerProps {
    keyOf: keyof KeyBindings;

    onChange: (code: string) => void;
}

export const AppKeyPicker: FC<AppKeyPickerProps> = ({keyOf, onChange}) => {
    useEffect(() => {
        const listener = ({code}: KeyboardEvent) => onChange(code);
        document.addEventListener('keydown', listener, {once: true});
        return () => document.removeEventListener('keydown', listener);
    });

    return (
        <div className="text-2xl font-bold text-center w-full uppercase">
            {KEY_BINDING_LABELS[keyOf]}
        </div>
    );
};
