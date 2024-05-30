import {useEffect} from 'react';
import ReactGA from 'react-ga';
import {toKebabCase} from '../strings.types';

export const useModalView = (open: boolean, title: string) => {
    useEffect(() => {
        if (open) {
            ReactGA.modalview(toKebabCase(title));
        }
    }, [open, title]);
};
