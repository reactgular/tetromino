import {StylesProvider} from '@material-ui/core/styles';
import {FunctionComponent} from 'react';
import {useDarkMode} from '../../particles/hooks/useDarkMode';

export const AppTheme: FunctionComponent = ({children}) => {
    useDarkMode();
    return <StylesProvider injectFirst>{children}</StylesProvider>;
};
