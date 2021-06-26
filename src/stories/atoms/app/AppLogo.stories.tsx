import {Story} from '@storybook/react';
import {AppLogo} from '../../../components/atoms/app/AppLogo';
import {environment} from '../../../environment/environment';
import {StoryMeta} from '../../particles/story-meta';

export default StoryMeta<unknown>(`atoms/app/${AppLogo.displayName}`, {
    args: {animate: false}
});

export const Example: Story<unknown> = () => (
    <AppLogo name={environment.brandName} />
);
Example.args = {};
