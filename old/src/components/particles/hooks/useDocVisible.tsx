import {useEffect, useState} from 'react';

export const useDocVisible = () => {
    const isVisible = () => document.visibilityState === 'visible';
    const [visible, setVisible] = useState(isVisible());
    useEffect(() => {
        const onVisible = () => setVisible(isVisible());
        document.addEventListener('visibilitychange', onVisible);
        return () =>
            document.removeEventListener('visibilitychange', onVisible);
    }, []);
    return visible;
};
