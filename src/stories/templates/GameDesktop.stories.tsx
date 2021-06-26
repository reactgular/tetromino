import {Story} from '@storybook/react';
import {GameDesktop} from '../../components/templates/GameDesktop';
import {StoryMeta} from '../particles/story-meta';

export default StoryMeta<unknown>(`templates/${GameDesktop.displayName}`, {
    args: {}
});

export const Example: Story<unknown> = () => (
    <GameDesktop floatControls={false} />
);
Example.args = {};
