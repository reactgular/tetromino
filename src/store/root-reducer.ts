import {combineReducers} from '@reduxjs/toolkit';
import {AppState} from './app/app-state';
import {GameState} from './game/game-state';

export const getRootReducer = () => {
    return combineReducers({
        app: AppState.slice.reducer,
        game: GameState.slice.reducer
    });
};

// export function acceptHotReload(store: Store, rootReducer: Reducer) {
//     if (process.env.NODE_ENV !== 'production' && module.hot) {
//         const log = loggerDebug(acceptHotReload.name);
//         log('enabled');
//         module.hot.accept(
//             ['./app/app-state', './game/game-state'],
//             (updatedDependencies) => {
//                 log(updatedDependencies);
//                 store.replaceReducer(rootReducer);
//             }
//         );
//     }
// }
