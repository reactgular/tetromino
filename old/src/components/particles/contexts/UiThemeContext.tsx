import {createContext, FC, useContext, useMemo} from 'react';

export interface UiTheme {
    large: boolean;

    transparent: boolean;
}

const UiThemeContext = createContext<UiTheme>({
    transparent: false,
    large: false
});

export const useUiTheme = () => useContext(UiThemeContext);

export const UiThemeProvider: FC<UiTheme> = ({
    transparent,
    large,
    children
}) => {
    const value = useMemo(() => ({transparent, large}), [transparent, large]);
    return (
        <UiThemeContext.Provider value={value}>
            {children}
        </UiThemeContext.Provider>
    );
};
