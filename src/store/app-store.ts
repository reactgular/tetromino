import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {environment} from '../environment/environment';
import {SnapShotMiddleware} from './snapshot-middleware';
import {acceptHotReload, getRootReducer} from './root-reducer';

/**
 * Configures the Redux store with a default state.
 */
export const configureAppStore = (preloadedState = {}) => {
    const rootReducer = getRootReducer();

    const store = configureStore({
        devTools: {
            name: environment.brandName,
            maxAge: 100
        },
        preloadedState,
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => {
            return [...getDefaultMiddleware(), SnapShotMiddleware];
        }
    });

    acceptHotReload(store, rootReducer);

    return store;
};

/**
 * The combined reducers create a complex Redux store type. So we create a
 * variable that TypeScript can use to extra rich types about the store.
 */
let appStore: ReturnType<typeof configureAppStore>;

export type AppStore = ReturnType<typeof configureAppStore>;

/**
 * Contains the type for the root state that holds all the reducers.
 */
export type AppState = ReturnType<typeof appStore.getState>;

/**
 * Types of dispatches including middleware.
 */
export type AppDispatch = typeof appStore.dispatch;

/**
 * Creates a dispatch function that returns proper typing for async Trunk
 * actions.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Defines a store configure function after types are declared. This allows
 * the function to have typing for the state parameter.
 */
export const getAppStore = (state?: AppState) => configureAppStore(state);
