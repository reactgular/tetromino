import {Action, Middleware} from 'redux';
import {AppState} from './app-store';

/**
 * Adds a snapshot of the store to each action.
 */
export const SnapShotMiddleware: Middleware = ({getState}) => {
    return (next) => (action) => {
        if(typeof action !== 'object' || action === null) {
            return next(action);
        }
        return next({...action, snapshot: getState()});
    };
};

/**
 * Declares an action that contains a snapshot of the store.
 */
export interface AppAction<TType = unknown> extends Action<string> {
    payload: TType;

    snapshot?: Readonly<AppState>;

    // Allows any extra properties to be defined in an action.
    [extraProps: string]: any;
}

/**
 * Allows us to use the snapshot inside a reducer case.
 */
export declare interface SnapshotAction<TType = unknown> {
    type: string;

    (...args: any[]): AppAction<TType>;
}
