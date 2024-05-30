import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../../store/app-store';
import {AppActions} from '../../../store/app/app-actions';
import {APP_PERSIST_DEFAULT, AppPersist} from '../../../store/app/app-model';
import {AppSelectors} from '../../../store/app/app-selectors';

export const usePersist = (storageKey: string) => {
    const persist = useSelector(AppSelectors.persist);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const json = localStorage.getItem(storageKey);
        if (json) {
            try {
                const data: AppPersist = JSON.parse(json);
                if (data?.version === APP_PERSIST_DEFAULT.version) {
                    dispatch(AppActions.persist(data));
                }
            } catch (err) {
                console.error('Could not read persist data.', err);
            }
        }
    }, [storageKey, dispatch]);

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(persist));
    }, [storageKey, persist]);
};
