import {Story} from '@storybook/react';
import {GameControls} from '../../../components/organisms/game/GameControls';
import {StoryMeta} from '../../particles/story-meta';

export default StoryMeta<unknown>(
    `organisms/game/${GameControls.displayName}`,
    {
        args: {}
    }
);

export const Example: Story<unknown> = (props) => <GameControls />;
