import {StylesProvider} from '@material-ui/core/styles';
import {FC, PropsWithChildren} from 'react';
import {useDarkMode} from '../../particles/hooks/useDarkMode';

export const AppTheme: FC<PropsWithChildren> = ({children}) => {
    useDarkMode();
    return <StylesProvider injectFirst>{children}</StylesProvider>;
};
