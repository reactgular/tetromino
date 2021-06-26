import {ActionReducerMapBuilder, createSlice} from '@reduxjs/toolkit';
import ReactGA from 'react-ga';
import {
    SOUND_DROP,
    SOUND_FINISHED,
    SOUND_LEVEL_10,
    SOUND_SCORE
} from '../../components/particles/audio.types';
import {randTetro} from '../../components/particles/utilities.types';
import {
    gameBufferPatch,
    gameBufferRowCount,
    gameBufferRowSome
} from '../../engine/game-buffer';
import {gameCollision} from '../../engine/game-collision';
import {gameGhost} from '../../engine/game-ghost';
import {gamePlayerCreate, gamePlayerTransform} from '../../engine/game-player';
import {gameReset} from '../../engine/game-reset';
import {gameScore} from '../../engine/game-score';
import {gameScreenRender} from '../../engine/game-screen';
import {gameSound} from '../../engine/game-sound';
import {
    gameDropPlayer,
    gameTickPlayer,
    gameTickRows
} from '../../engine/game-tick';
import {
    GamePlayerDirection,
    gameTransform,
    rotateDirection,
    rotateNoop,
    translateDirection,
    translateNoop
} from '../../engine/game-transform';
import {SnapshotAction} from '../snapshot-middleware';
import {GameActions} from './game-actions';
import {
    GAME_INITIAL_STATE,
    GAME_NAME,
    GameModel,
    GameStatus
} from './game-model';

export namespace GameState {
    const track = (action: string, value?: number) => {
        ReactGA.event({category: GAME_NAME, action, value});
    };

    export const slice = createSlice({
        name: GAME_NAME,
        initialState: GAME_INITIAL_STATE,
        reducers: {},
        extraReducers: (builder: ActionReducerMapBuilder<GameModel>) => {
            builder
                .addCase(GameActions.softDrop, (state, {payload}) => {
                    state.soft_drop = payload;
                })
                .addCase(GameActions.start, (state, {payload}) => {
                    track('start');
                    const reset = gameReset(state.next_max);
                    return {
                        ...reset,
                        level: payload,
                        status: GameStatus.STARTING
                    };
                })
                .addCase(GameActions.run, (state, action) => {
                    state.status = GameStatus.RUNNING;
                })
                .addCase(GameActions.pause, (state, action) => {
                    track('pause');
                    state.status = GameStatus.PAUSED;
                })
                .addCase(GameActions.resume, (state, action) => {
                    track('resume');
                    state.status = GameStatus.STARTING;
                })
                .addCase(GameActions.quit, (state) => {
                    track('quit');
                    return gameReset(state.next_max);
                })
                .addCase(GameActions.render, (state, action) => {
                    state.screen = gameScreenRender(
                        state.buffer,
                        state.player,
                        state.ghost
                    );
                })
                .addCase<SnapshotAction>(
                    GameActions.tick,
                    (state, {snapshot}) => {
                        if (state.player) {
                            const {collision, lines} = gameTickPlayer(
                                state.buffer,
                                state.player!
                            );
                            if (collision) {
                                const old_level = state.level;
                                const sound = gameScore(
                                    state,
                                    state.player.type,
                                    lines!
                                );
                                if (
                                    old_level !== state.level &&
                                    state.level % 5 === 0
                                ) {
                                    state.toast_message = `Level ${state.level}`;
                                    if (snapshot?.app.sound) {
                                        gameSound(state, SOUND_LEVEL_10);
                                    }
                                }
                                if (snapshot?.app.sound && sound) {
                                    gameSound(state, sound);
                                }
                                state.player_freeze = false;
                                state.hold_enable = true;
                                state.player = undefined;
                                state.ghost = undefined;
                            } else {
                                state.ghost = snapshot?.app.ghost_piece
                                    ? gameGhost(state.buffer, state.player)
                                    : undefined;
                            }
                        } else {
                            if (!gameTickRows(state.buffer)) {
                                const next = state.next.shift();
                                if (state.next.length < state.next_max) {
                                    state.next.push(randTetro());
                                }
                                const player = gamePlayerCreate(
                                    next!,
                                    state.buffer.width
                                );
                                const trans = gameTransform(
                                    player,
                                    translateNoop,
                                    rotateNoop
                                );
                                if (gameCollision(trans, state.buffer)) {
                                    snapshot?.app.sound &&
                                        gameSound(state, SOUND_FINISHED);
                                    state.restart_ticker++;
                                    state.status = GameStatus.FINISHING;
                                } else {
                                    state.player = player;
                                    state.ghost = snapshot?.app.ghost_piece
                                        ? gameGhost(state.buffer, player)
                                        : undefined;
                                }
                            }
                        }
                        state.screen = gameScreenRender(
                            state.buffer,
                            state.player,
                            state.ghost
                        );
                    }
                )
                .addCase<SnapshotAction>(
                    GameActions.finishing,
                    (state, {snapshot}) => {
                        const isRemoved = state.buffer.rows.find(
                            (row) => row.removed
                        );
                        if (isRemoved) {
                            state.score += gameBufferRowCount(isRemoved);
                            gameTickRows(state.buffer);
                        } else {
                            const nextRow = state.buffer.rows.find((r) =>
                                gameBufferRowSome(r)
                            );
                            if (nextRow) {
                                nextRow.removed = true;
                            } else {
                                state.status = GameStatus.FINISHED;
                            }
                        }
                        state.screen = gameScreenRender(
                            state.buffer,
                            state.player,
                            state.ghost
                        );
                    }
                )
                .addCase<SnapshotAction>(
                    GameActions.hardDrop,
                    (state, {snapshot}) => {
                        if (state.player && !state.player_freeze) {
                            const origin_y = state.player.y;
                            gameDropPlayer(state.buffer, state.player);
                            state.restart_ticker++;
                            state.screen = gameScreenRender(
                                state.buffer,
                                state.player,
                                undefined,
                                origin_y
                            );
                            state.player_freeze = true;
                            state.ghost = undefined;
                            if (snapshot?.app.sound) {
                                gameSound(state, SOUND_DROP);
                                gameSound(state, SOUND_SCORE);
                            }
                        }
                    }
                )
                .addCase(GameActions.bufferSet, (state, {payload}) => {
                    state.buffer = payload;
                })
                .addCase(GameActions.bufferPatch, (state, {payload}) => {
                    payload.forEach((patch) =>
                        gameBufferPatch(state.buffer, patch)
                    );
                })
                .addCase<SnapshotAction<GamePlayerDirection>>(
                    GameActions.rotate,
                    (state, {payload, snapshot}) => {
                        if (state.player && !state.player_freeze) {
                            gamePlayerTransform(
                                state.buffer,
                                state.player,
                                translateNoop,
                                rotateDirection[payload]
                            );
                            state.ghost = snapshot?.app.ghost_piece
                                ? gameGhost(state.buffer, state.player)
                                : undefined;
                            state.screen = gameScreenRender(
                                state.buffer,
                                state.player,
                                state.ghost
                            );
                        }
                    }
                )
                .addCase<SnapshotAction<GamePlayerDirection>>(
                    GameActions.move,
                    (state, {payload, snapshot}) => {
                        if (state.player && !state.player_freeze) {
                            gamePlayerTransform(
                                state.buffer,
                                state.player,
                                translateDirection[payload],
                                rotateNoop
                            );
                            state.ghost = snapshot?.app.ghost_piece
                                ? gameGhost(state.buffer, state.player)
                                : undefined;
                            state.screen = gameScreenRender(
                                state.buffer,
                                state.player,
                                state.ghost
                            );
                        }
                    }
                )
                .addCase(GameActions.hold, (state) => {
                    if (state.player) {
                        if (state.hold) {
                            state.next = [state.hold, ...state.next];
                        }
                        state.hold = state.player.type;
                        state.hold_enable = false;
                        state.player = undefined;
                        state.ghost = undefined;
                        state.restart_ticker++;
                        state.screen = gameScreenRender(
                            state.buffer,
                            state.player,
                            state.ghost
                        );
                    }
                })
                .addCase(GameActions.soundTrack, (state, {payload}) => {
                    state.sound_tracks = state.sound_tracks.filter(
                        ({id}) => id !== payload
                    );
                })
                .addCase<SnapshotAction<Partial<GameModel>>>(
                    GameActions.patch,
                    (state, {payload, snapshot}) => {
                        const ghost =
                            snapshot?.app.ghost_piece && state.player
                                ? gameGhost(state.buffer, state.player)
                                : undefined;
                        const screen = gameScreenRender(
                            state.buffer,
                            state.player,
                            ghost
                        );
                        return {
                            ...state,
                            ...payload,
                            ghost,
                            screen
                        };
                    }
                );
        }
    });
}
