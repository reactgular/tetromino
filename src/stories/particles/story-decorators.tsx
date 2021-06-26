/* eslint-disable @typescript-eslint/no-explicit-any */
import {BaseDecorators} from '@storybook/addons/dist/ts3.9/types';
import {useEffect} from 'react';
import {useAppDispatch} from '../../store/app-store';
import {AppActions} from '../../store/app/app-actions';

export const DECORATOR_NARROW: BaseDecorators<any> = [
    (Story, context) => (
        <div className="w-32">
            <Story />
        </div>
    )
];

export const DECORATOR_DARK_MODE: BaseDecorators<any> = [
    (Story, context) => {
        const dispatch = useAppDispatch();
        useEffect(() => {
            dispatch(AppActions.dark(Boolean(context.args['darkMode'])));
        }, [dispatch, context.args]);
        return <Story />;
    }
];
