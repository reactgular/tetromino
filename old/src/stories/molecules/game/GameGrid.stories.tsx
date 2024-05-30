import {Story} from '@storybook/react';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {GameGrid} from '../../../components/molecules/game/GameGrid';
import {useInterval} from '../../../components/particles/hooks/useInterval';
import {GameCellPatch} from '../../../engine/game-cell';
import {TetrominosType} from '../../../engine/game-tetrominos';
import {useAppDispatch} from '../../../store/app-store';
import {GameActions} from '../../../store/game/game-actions';
import {GameSelectors} from '../../../store/game/game-selectors';
import {StoryMeta} from '../../particles/story-meta';

interface StoryProps {
    seed: number;
}

export default StoryMeta<StoryProps>(`molecules/game/${GameGrid.displayName}`, {
    args: {seed: 1}
});

export const Empty: Story<StoryProps> = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(GameActions.start(1));
        dispatch(GameActions.run());
    }, [dispatch]);
    return <GameGrid className="mr-auto" />;
};
Empty.args = {};

const randomSeed = (s: number) => () => {
    s = Math.sin(s) * 10000;
    return s - Math.floor(s);
};

const randomMax = (seed: number, max: number) => {
    const random = randomSeed(seed);
    return () => Math.floor(random() * max);
};

function* generateRandom(
    seed: number,
    width: number,
    height: number
): IterableIterator<GameCellPatch> {
    const max = Object.keys(TetrominosType).length;
    const types = Object.values(TetrominosType);
    const random = randomMax(seed, max);
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            yield {x, y, type: types[random()]};
        }
    }
}

export const Filled: Story<StoryProps> = ({seed}) => {
    const [width, height] = useSelector(GameSelectors.size);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(GameActions.start(1));
        dispatch(GameActions.run());
        dispatch(
            GameActions.bufferPatch(
                Array.from(generateRandom(seed, width, height))
            )
        );
        dispatch(GameActions.render());
    }, [seed, width, height, dispatch]);
    return <GameGrid className="mr-auto" />;
};
Filled.args = {};

export const Random: Story<StoryProps> = ({seed}) => {
    const [width, height] = useSelector(GameSelectors.size);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(GameActions.start(1));
        dispatch(GameActions.run());
    }, [dispatch]);

    useInterval(
        () => {
            const rand = (max: number) => Math.floor(Math.random() * max);
            const x = rand(width);
            const y = rand(height);
            const types = Object.values(TetrominosType);
            dispatch(
                GameActions.bufferPatch([
                    {x, y, type: types[rand(types.length)]}
                ])
            );
            dispatch(GameActions.render());
        },
        200,
        [seed, width, height, dispatch]
    );

    return <GameGrid className="mr-auto" />;
};
Random.args = {};
