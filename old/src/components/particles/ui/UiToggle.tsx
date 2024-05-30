import classNames from 'classnames';
import {cloneElement, FC, ReactElement, useMemo} from 'react';
import {FaCheck, FaTimes} from 'react-icons/fa';
import {ClassNameProps} from '../particles.types';

export interface UiToggleProps {
    iconOff?: ReactElement;

    iconOn?: ReactElement;

    onChange: (value: boolean) => void;

    value: boolean;
}

export const UiToggle: FC<UiToggleProps & ClassNameProps> = ({
    value,
    onChange,
    iconOn,
    iconOff,
    className
}) => {
    const cloneOn = useMemo(() => {
        const icon = iconOn || <FaCheck className="text-green-200" />;
        return cloneElement(icon, {
            className: `text-[24px] mr-1 ${icon.props.className}`
        });
    }, [iconOn]);

    const cloneOff = useMemo(() => {
        const icon = iconOff || <FaTimes className="text-red-500" />;
        return cloneElement(icon, {
            className: `text-[24px] ${icon.props.className}`
        });
    }, [iconOff]);

    return (
        <div
            className={classNames(
                className,
                'flex relative p-1 text-[26px] h-[26px] w-[50px] bg-black rounded-full cursor-pointer items-center justify-between'
            )}
            onClick={() => onChange(!value)}
        >
            {cloneOn}
            {cloneOff}
            <div
                className={classNames(
                    'bg-white rounded-full absolute top-[2px] left-[2px] h-[22px] w-[22px] transition-transform transform translate-x-0',
                    {'translate-x-[24px]': Boolean(value)}
                )}
            />
        </div>
    );
};
