import {Story} from '@storybook/react';
import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {GameEngine} from '../../../components/organisms/game/GameEngine';
import {UiButton} from '../../../components/particles/ui/UiButton';
import {GameCellPatch} from '../../../engine/game-cell';
import {gamePlayerCreate} from '../../../engine/game-player';
import {BUFFER_HEIGHT, BUFFER_WIDTH} from '../../../engine/game-reset';
import {TetrominosType} from '../../../engine/game-tetrominos';
import {useAppDispatch} from '../../../store/app-store';
import {AppActions} from '../../../store/app/app-actions';
import {GameActions} from '../../../store/game/game-actions';
import {GameSelectors} from '../../../store/game/game-selectors';
import {StoryMeta} from '../../particles/story-meta';

interface StoryProps {
    auto_restart: boolean;

    level: number;

    rows: number;

    soft: boolean;
}

export default StoryMeta<StoryProps>(
    `organisms/game/${GameEngine.displayName}`,
    {
        decorators: [
            (Story, context) => {
                const [count, setCount] = useState(0);
                return (
                    <div className="mx-auto">
                        {[count].map((key) => (
                            <Story key={key} />
                        ))}
                        <UiButton
                            className="flex mx-auto px-4 py-2 m-5"
                            primary={true}
                            onClick={() => setCount(count + 1)}
                        >
                            Restart
                        </UiButton>
                    </div>
                );
            }
        ],
        args: {}
    }
);

function* generateBuffer(
    x1: number,
    y1: number,
    x2: number = BUFFER_WIDTH,
    y2: number = BUFFER_HEIGHT,
    type: TetrominosType = TetrominosType.J
): IterableIterator<GameCellPatch> {
    for (let x = x1; x < x2; x++) {
        for (let y = y1; y < y2; y++) {
            yield {x, y, type};
        }
    }
}

export const ClearRows: Story<StoryProps> = ({
    rows,
    level,
    soft,
    auto_restart
}) => {
    const dispatch = useAppDispatch();
    const score = useSelector(GameSelectors.score);

    const start = useCallback(() => {
        const player = gamePlayerCreate(TetrominosType.J, BUFFER_WIDTH);
        player.rotate = 3;
        player.x = 0;
        dispatch(AppActions.music(false));
        dispatch(AppActions.sound(false));
        dispatch(GameActions.start(level));
        dispatch(GameActions.patch({player}));
        dispatch(
            GameActions.bufferPatch(
                Array.from(generateBuffer(1, BUFFER_HEIGHT - rows))
            )
        );
        dispatch(GameActions.run());
    }, [dispatch, rows, level]);

    useEffect(() => {
        start();
    }, [start]);

    useEffect(() => {
        if (auto_restart && score > 0) {
            const id = setTimeout(() => start(), 1500);
            return () => clearTimeout(id);
        }
        if (!soft) {
            const id = setTimeout(() => {
                dispatch(GameActions.hardDrop());
            }, 1000);
            return () => clearTimeout(id);
        }
    }, [dispatch, score, auto_restart, start, soft]);

    return <GameEngine />;
};
ClearRows.args = {rows: 8, level: 15, soft: true, auto_restart: true};
