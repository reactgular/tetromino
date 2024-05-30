import {GameModel} from '../store/game/game-model';

export type GameSound = Pick<GameModel, 'sound_tracks' | 'sound_id'>;

export const gameSound = (state: GameSound, src: string) => {
    state.sound_tracks.push({
        id: state.sound_id++,
        src
    });
};
