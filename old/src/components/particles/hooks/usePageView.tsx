import {useEffect} from 'react';
import ReactGA from 'react-ga';

export const usePageView = (url: string) => {
    useEffect(() => {
        ReactGA.pageview(url);
    }, [url]);
};
