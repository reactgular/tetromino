import {PayloadAction} from '@reduxjs/toolkit';
import classNames from 'classnames';
import {FC} from 'react';
import {useAppDispatch} from '../../../store/app-store';
import {ClassNameProps} from '../../particles/particles.types';
import {UiButton} from '../../particles/ui/UiButton';

export interface AppMenuItem {
    action: PayloadAction<any>;

    active?: boolean;

    title: string;
}

export interface AppMenuProps {
    items: AppMenuItem[];
}

export const AppMenu: FC<AppMenuProps & ClassNameProps> = ({
    items,
    className
}) => {
    const dispatch = useAppDispatch();
    return (
        <div className={classNames(className, 'flex flex-col')}>
            {items.map(({action, active, title}, indx) => (
                <UiButton
                    className="py-2 px-4 mb-4"
                    primary={active}
                    onClick={() => dispatch(action)}
                    key={indx}
                >
                    {title}
                </UiButton>
            ))}
        </div>
    );
};
