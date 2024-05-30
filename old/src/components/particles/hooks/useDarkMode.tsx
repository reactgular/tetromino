import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {AppSelectors} from '../../../store/app/app-selectors';

export const useDarkMode = () => {
    const dark = useSelector(AppSelectors.dark);
    useEffect(() => {
        const html = document.documentElement;
        if (dark) {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
    }, [dark]);
};
