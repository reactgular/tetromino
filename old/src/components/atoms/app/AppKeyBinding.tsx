import {FC, useMemo} from 'react';
import {toSpaces} from '../../particles/strings.types';
import {UiButton} from '../../particles/ui/UiButton';

const CODE_PREFIXES = ['Digit', 'Key', 'Arrow'];

export interface AppKeyBindingProps {
    keyCode: string;

    label: string;

    onClick: () => void;
}

export const AppKeyBinding: FC<AppKeyBindingProps> = ({
    label,
    keyCode,
    onClick
}) => {
    const str = useMemo(() => {
        const code = CODE_PREFIXES.reduce((str, prefix) => {
            return str.replace(prefix, '').trim();
        }, keyCode);
        return toSpaces(code);
    }, [keyCode]);

    return (
        <>
            <div>{label}</div>
            <UiButton className="w-full" onClick={onClick}>
                {str}
            </UiButton>
        </>
    );
};
