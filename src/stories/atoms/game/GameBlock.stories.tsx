import {Story} from '@storybook/react';
import {GameBlock} from '../../../components/atoms/game/GameBlock';
import {TETROMINOS_TYPES} from '../../../engine/game-tetrominos';
import {StoryMeta} from '../../particles/story-meta';

const TYPES = [undefined, ...TETROMINOS_TYPES];

interface StoryProps {
    ghost: number;

    glow: boolean;
}

export default StoryMeta<StoryProps>(`atoms/game/${GameBlock.displayName}`, {
    args: {
        glow: false,
        ghost: 0
    }
});

export const Types: Story<StoryProps> = ({glow, ghost}) => {
    return (
        <div className="flex flex-wrap">
            {TYPES.map((type, indx) => {
                return (
                    <div
                        className="game-grid m-3"
                        style={{gridTemplateColumns: `repeat(5, 1fr)`}}
                        key={indx}
                    >
                        {Array(25)
                            .fill(0)
                            .map((_, indx) => (
                                <GameBlock
                                    key={indx}
                                    glow={glow}
                                    ghost={ghost}
                                    speed={250}
                                    type={type}
                                />
                            ))}
                    </div>
                );
            })}
        </div>
    );
};
Types.args = {};
