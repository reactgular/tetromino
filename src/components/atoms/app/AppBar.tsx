import {PayloadAction} from '@reduxjs/toolkit';
import classNames from 'classnames';
import React, {FC, ReactElement} from 'react';
import {useAppDispatch} from '../../../store/app-store';
import {ClassNameProps} from '../../particles/particles.types';
import {UiButton} from '../../particles/ui/UiButton';

export interface AppBarTool {
    action: PayloadAction<any>;

    active?: boolean;

    icon: ReactElement;

    toolTip: string;
}

export interface AppBarProps {
    tools: Array<AppBarTool>;
}

export const AppBar: FC<AppBarProps & ClassNameProps> = ({
    tools,
    className
}) => {
    const dispatch = useAppDispatch();
    return (
        <div className={classNames(className, 'flex justify-between w-full')}>
            {tools.map(({icon, toolTip, active, action}, indx) => (
                <UiButton
                    key={indx}
                    className="rounded-full text-[12px] p-2"
                    primary={true}
                    active={active}
                    onClick={() => dispatch(action)}
                    toolTip={toolTip}
                >
                    {icon}
                </UiButton>
            ))}
        </div>
    );
};
