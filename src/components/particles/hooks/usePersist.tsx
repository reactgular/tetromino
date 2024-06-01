import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../../store/app-store';
import {AppActions} from '../../../store/app/app-actions';
import {AppPersist} from '../../../store/app/app-model';
import {AppSelectors} from '../../../store/app/app-selectors';

export const usePersist = (version: string, storageKey: string) => {
    const persist = useSelector(AppSelectors.persist);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const json = localStorage.getItem(storageKey);
        if (json) {
            try {
                const data: AppPersist & {version: string} = JSON.parse(json);
                if (data?.version === version) {
                    const {version, ...state} = data;
                    dispatch(AppActions.persist(state));
                }
            } catch (err) {
                console.error('Could not read persist data.', err);
            }
        }
    }, [version, storageKey, dispatch]);

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify({...persist, version}));
    }, [version, storageKey, persist]);
};
