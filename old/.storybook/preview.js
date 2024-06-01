import '../src/index.css';
import {AppTheme} from '../src/components/atoms/app/AppTheme';
import {useMemo} from 'react';
import {getAppStore} from '../src/store/app-store';
import {Provider} from 'react-redux';

export const parameters = {
    actions: {argTypesRegex: '^on[A-Z].*'},
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/
        }
    }
};

export const decorators = [
    (Story) => {
        const store = useMemo(() => getAppStore(), []);
        return (
            <Provider store={store}>
                <AppTheme>
                    <Story />
                </AppTheme>
            </Provider>
        );
    }
];
