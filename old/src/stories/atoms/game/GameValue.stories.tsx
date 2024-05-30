import {Story} from '@storybook/react';
import {
    GameValue,
    GameValueProps
} from '../../../components/atoms/game/GameValue';
import {DECORATOR_NARROW} from '../../particles/story-decorators';
import {StoryMeta} from '../../particles/story-meta';

interface StoryProps extends GameValueProps {
    inner: string;
}

export default StoryMeta<StoryProps>(`atoms/game/${GameValue.displayName}`, {
    decorators: DECORATOR_NARROW,
    args: {label: 'Example', inner: ''}
});

export const Empty: Story<StoryProps> = ({label, inner}) => (
    <GameValue label={label}>{inner}</GameValue>
);
Empty.args = {};

export const Numbers: Story<StoryProps> = ({label, inner}) => (
    <GameValue label={label}>{inner}</GameValue>
);
Numbers.args = {inner: '1234'};
