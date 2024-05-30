import {FC, useMemo} from 'react';
import {Provider} from 'react-redux';
import {getAppStore} from '../../store/app-store';
import {AppTheme} from '../atoms/app/AppTheme';

export const Providers: FC = ({children}) => {
    const store = useMemo(() => getAppStore(), []);
    return (
        <Provider store={store}>
            <AppTheme>{children}</AppTheme>
        </Provider>
    );
};
