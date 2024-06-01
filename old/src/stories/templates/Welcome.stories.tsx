import {Story} from '@storybook/react';
import {Welcome} from '../../components/templates/Welcome';
import {StoryMeta} from '../particles/story-meta';

export default StoryMeta<unknown>(`templates/${Welcome.displayName}`, {
    args: {}
});

export const Example: Story<unknown> = () => <Welcome />;
Example.args = {};
