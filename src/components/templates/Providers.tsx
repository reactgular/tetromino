'use client';

import {FC, PropsWithChildren, useMemo} from 'react';
import {Provider} from 'react-redux';
import {getAppStore} from '../../store/app-store';
import {AppTheme} from '../atoms/app/AppTheme';

export const Providers: FC<PropsWithChildren> = ({children}) => {
    const store = useMemo(() => getAppStore(), []);
    return (
        <Provider store={store}>
            <AppTheme>{children}</AppTheme>
        </Provider>
    );
};
