import classNames from 'classnames';
import {FC, useMemo} from 'react';
import {useMaxDigits} from '../../particles/hooks/useMaxDigits';
import {useSpaces} from '../../particles/hooks/useSpaces';
import {useZeros} from '../../particles/hooks/useZeros';
import {ClassNameProps} from '../../particles/particles.types';

export interface GameDigitsProps {
    digits: number;

    primary?: boolean;

    value: number;
}

export const GameDigits: FC<GameDigitsProps & ClassNameProps> = ({
    value,
    digits,
    primary = true,
    className
}) => {
    const zeros = useZeros(digits);
    const maxDigits = useMaxDigits(value, digits);
    const spaces = useSpaces(digits - maxDigits.length);
    const color = useMemo(
        () => ({
            'text-primary': primary,
            'text-secondary': !primary
        }),
        [primary]
    );

    return (
        <div
            className={classNames(
                className,
                'flex relative leading-none font-digits p-2'
            )}
        >
            <div className="relative mx-auto">
                <div className={classNames('opacity-20', color)}>{zeros}</div>
                <div className={classNames('absolute top-0 left-0', color)}>
                    <span dangerouslySetInnerHTML={spaces} />
                    <span>{maxDigits}</span>
                </div>
            </div>
        </div>
    );
};
