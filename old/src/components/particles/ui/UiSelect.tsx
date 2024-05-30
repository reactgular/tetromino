import {useCallback, useMemo} from 'react';
import {UiButton} from './UiButton';

export interface UiOption<TType> {
    label: string;

    value: TType;
}

export interface UiSelectProps<TType> {
    onChange: (value: TType) => void;

    options: Array<UiOption<TType>>;

    value: TType;
}

export function UiSelect<TType>({
    onChange,
    options,
    value
}: UiSelectProps<TType>) {
    const indx = useMemo(
        () => options.findIndex((option) => option.value === value),
        [value, options]
    );

    const increase = useCallback(() => {
        const i = Math.min(options.length - 1, indx + 1);
        onChange(options[i].value);
    }, [onChange, options, indx]);

    const decrease = useCallback(() => {
        const i = Math.max(0, indx - 1);
        onChange(options[i].value);
    }, [onChange, options, indx]);

    return (
        <div className="flex">
            <UiButton className="px-4" onClick={decrease} disabled={indx <= 0}>
                -
            </UiButton>
            <div className="flex-grow text-center">{options[indx]?.label}</div>
            <UiButton
                className="px-4"
                onClick={increase}
                disabled={indx >= options.length - 1}
            >
                +
            </UiButton>
        </div>
    );
}
