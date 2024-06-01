import {PayloadAction} from '@reduxjs/toolkit';
import {FC} from 'react';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../../store/app-store';
import {AppActions} from '../../../store/app/app-actions';
import {ClassNameProps} from '../../particles/particles.types';
import {UiDialog} from '../../particles/ui/UiDialog';

export interface AppDialogControl {
    closeAction?: PayloadAction<any>;

    selectOpen: any;
}

export interface AppDialogProps {
    large?: boolean;

    title: string;
}

export const AppDialog: FC<AppDialogProps & AppDialogControl & ClassNameProps> =
    ({
        closeAction = AppActions.close(),
        selectOpen,
        title,
        large,
        children,
        className
    }) => {
        const dispatch = useAppDispatch();
        const open = useSelector(selectOpen);
        return (
            <UiDialog
                className={className}
                open={Boolean(open)}
                title={title}
                large={large}
                onClose={() => dispatch(closeAction)}
            >
                {children}
            </UiDialog>
        );
    };
