import {render} from '@testing-library/react';
import renderer from 'react-test-renderer';
import {
    GAME_BLOCK_COLOR,
    GameBlock
} from '../../../../components/atoms/game/GameBlock';
import {TETROMINOS_TYPES} from '../../../../engine/game-tetrominos';

describe(GameBlock.name, () => {
    it('should render the same as defaults if type is empty', () => {
        const tree = renderer.create(<GameBlock />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should set the block color', () => {
        TETROMINOS_TYPES.map((type) => {
            const {container} = render(<GameBlock type={type} />);
            const $ = container.querySelector.bind(container);
            expect($('.block-color')).toBeTruthy();
            expect($(`.${GAME_BLOCK_COLOR[type]}`)).toBeTruthy();
        });
    });

    it('should not glow unless there is a type', () => {
        const {container} = render(<GameBlock glow={true} />);
        const $ = container.querySelector.bind(container);
        expect($('.color-glow')).toBeFalsy();
    });

    it('should glow the block without a color', () => {
        TETROMINOS_TYPES.map((type) => {
            const {container} = render(<GameBlock glow={true} type={type} />);
            const $ = container.querySelector.bind(container);
            expect($('.block-color')).toBeTruthy();
            expect($('.color-glow')).toBeTruthy();
            expect($(`.${GAME_BLOCK_COLOR[type]}`)).toBeFalsy();
        });
    });
});
