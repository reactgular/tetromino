import {Story} from '@storybook/react';
import {
    GameDigits,
    GameDigitsProps
} from '../../../components/atoms/game/GameDigits';
import {DECORATOR_NARROW} from '../../particles/story-decorators';
import {StoryMeta} from '../../particles/story-meta';

export default StoryMeta<GameDigitsProps>(
    `atoms/game/${GameDigits.displayName}`,
    {
        decorators: DECORATOR_NARROW,
        args: {value: 0, digits: 10, primary: true}
    }
);

export const Numbers: Story<GameDigitsProps> = (props) => (
    <GameDigits className="text-6xl" {...props} />
);
Numbers.args = {value: 1234};
