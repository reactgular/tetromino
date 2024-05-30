import {ArgTypes, BaseDecorators} from '@storybook/addons/dist/ts3.9/types';
import {Meta} from '@storybook/react/types-6-0';
import {DECORATOR_DARK_MODE} from './story-decorators';

export interface StoryMetaOptions<TType> {
    argTypes?: ArgTypes;

    args?: Partial<TType>;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    decorators?: BaseDecorators<any>;

    panning?: boolean;
}

export interface StoryMetaProps {
    darkMode: boolean;
}

export function StoryMeta<TType>(
    name: string | undefined,
    options: StoryMetaOptions<TType> = {}
): Meta<TType | StoryMetaProps> {
    return {
        title: `atoms/${name}`,
        parameters: {
            options: {
                enableShortcuts: false
            }
        },
        decorators: [...(options.decorators || []), ...DECORATOR_DARK_MODE],
        argTypes: {
            darkMode: {control: {type: 'boolean'}},
            ...(options.argTypes || {})
        },
        args: {
            darkMode: false,
            ...(options.args || {})
        }
    } as Meta<TType | StoryMetaProps>;
}
