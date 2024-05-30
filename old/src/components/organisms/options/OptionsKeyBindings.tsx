import {ActionCreatorWithPayload} from '@reduxjs/toolkit';
import {FC, useState} from 'react';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../../store/app-store';
import {AppActions} from '../../../store/app/app-actions';
import {AppSelectors} from '../../../store/app/app-selectors';
import {AppKeyBinding} from '../../atoms/app/AppKeyBinding';
import {useLogger} from '../../particles/hooks/useLogger';
import {
    KEY_BINDING_LABELS,
    KEY_BINDINGS,
    KeyBindings
} from '../../particles/key_bindings.types';
import {UiButton} from '../../particles/ui/UiButton';
import {UiDialog} from '../../particles/ui/UiDialog';
import {AppKeyPicker} from '../app/AppKeyPicker';

export interface OptionsKeyBindingsProps {
    actionKeys?: ActionCreatorWithPayload<Partial<KeyBindings>>;

    selectKeys?: () => KeyBindings;
}

export const OptionsKeyBindings: FC<OptionsKeyBindingsProps> = ({
    selectKeys = AppSelectors.keys,
    actionKeys = AppActions.keys
}) => {
    const [pickKey, setPickKey] = useState<keyof KeyBindings | undefined>();
    const keys = useSelector(selectKeys);
    const dispatch = useAppDispatch();
    const log = useLogger(OptionsKeyBindings.name);
    return (
        <>
            {KEY_BINDINGS.map((keyOf, indx) => (
                <AppKeyBinding
                    key={indx}
                    keyCode={keys[keyOf]}
                    label={KEY_BINDING_LABELS[keyOf]}
                    onClick={() => setPickKey(keyOf)}
                />
            ))}
            <UiDialog
                className="max-w-[22rem]"
                title="Press Key"
                open={Boolean(pickKey)}
                onClose={() => setPickKey(undefined)}
            >
                <AppKeyPicker
                    keyOf={pickKey!}
                    onChange={(code) => {
                        log({pickKey, code});
                        dispatch(actionKeys({keyOf: pickKey!, code}));
                        setPickKey(undefined);
                    }}
                />
                <UiButton
                    className="mt-5 ml-auto mr-auto px-6 py-2"
                    primary={true}
                    onClick={() => setPickKey(undefined)}
                >
                    Cancel
                </UiButton>
            </UiDialog>
        </>
    );
};
