import {render, RenderResult} from '@testing-library/react';
import {FC, ReactElement} from 'react';
import {Provider} from 'react-redux';
import {AppDispatch, AppState, AppStore, getAppStore} from '../store/app-store';
import {APP_INITIAL_STATE} from '../store/app/app-model';
import {GAME_INITIAL_STATE, GameModel} from '../store/game/game-model';

export interface AppStoreResult {
    dispatch: AppDispatch;

    store: AppStore;
}

export type RenderAppResult = RenderResult & AppStoreResult;

export function renderApp(ui: ReactElement, state: AppState): RenderAppResult {
    const store = getAppStore(state);
    const Wrapper: FC = ({children}) => {
        return <Provider store={store}>{children}</Provider>;
    };
    const result = render(ui, {wrapper: Wrapper});
    return {...result, store, dispatch: store.dispatch};
}

export function renderGame(
    ui: ReactElement,
    game: Partial<GameModel>
): RenderAppResult {
    return renderApp(ui, {
        app: APP_INITIAL_STATE,
        game: {...GAME_INITIAL_STATE, ...game}
    });
}
