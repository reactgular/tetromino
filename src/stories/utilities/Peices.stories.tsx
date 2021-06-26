import {Story} from '@storybook/react';
import {DesignDisplay} from '../../components/molecules/design/DesignDisplay';
import {GAME_PIECES} from '../../engine/game-player';
import {TETROMINOS_TYPES} from '../../engine/game-tetrominos';
import {StoryMeta} from '../particles/story-meta';

export default StoryMeta(`utilities`);

export const Pieces: Story = () => {
    return (
        <div className="flex flex-col overflow-x-auto">
            <div className="flex flex-col mb-3">
                <div className="text-2xl font-bold border-b mb-3">null</div>
                <div className="flex">
                    <DesignDisplay className="mr-3" />
                </div>
            </div>
            {TETROMINOS_TYPES.map((type) => (
                <div key={type} className="flex flex-col mb-3">
                    <div className="text-2xl font-bold border-b mb-3">
                        {type.toUpperCase()}
                    </div>
                    <div className="flex">
                        {GAME_PIECES[type].map((piece, indx) => (
                            <DesignDisplay
                                className="mr-3"
                                key={indx}
                                values={piece}
                                type={type}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
