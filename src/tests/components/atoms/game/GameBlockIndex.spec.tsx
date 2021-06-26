import {GameBlockIndex} from '../../../../components/atoms/game/GameBlockIndex';
import {GameScreen} from '../../../../engine/game-screen';
import {TetrominosType} from '../../../../engine/game-tetrominos';
import {renderGame} from '../../../render-app';

describe(GameBlockIndex.name, () => {
    it('should render a block from the screen', () => {
        const screen: GameScreen = [{type: TetrominosType.J}];
        const results = renderGame(<GameBlockIndex indx={0} />, {screen});
        expect(results.getByTestId('game-block')).toBeTruthy();
    });

    it('should not render out of bounds cells', () => {
        const screen: GameScreen = [];
        const results = renderGame(<GameBlockIndex indx={999} />, {screen});
        expect(results.queryByTestId('game-block')).toBeFalsy();
    });
});
