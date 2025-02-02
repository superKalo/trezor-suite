import { Meta, StoryObj } from '@storybook/react';
import { Button as ButtonComponent, ButtonProps } from './Button';
import { framePropsStory } from '../../common/frameProps';
import { variables } from '../../../config';

const meta: Meta = {
    title: 'Buttons/Button',
    component: ButtonComponent,
} as Meta;
export default meta;

export const Button: StoryObj<ButtonProps> = {
    args: {
        children: 'Button label',
        variant: 'primary',
        size: 'medium',
        isDisabled: false,
        isLoading: false,
        isFullWidth: false,
        iconAlignment: 'left',
        title: 'Button title',
        ...framePropsStory.args,
    },
    argTypes: {
        children: {
            table: {
                type: {
                    summary: 'ReactNode',
                },
            },
        },
        variant: {
            control: {
                type: 'radio',
            },
            options: ['primary', 'secondary', 'tertiary', 'info', 'warning', 'destructive'],
        },
        size: {
            control: {
                type: 'radio',
            },
            options: ['large', 'medium', 'small', 'tiny'],
        },
        isDisabled: {
            control: {
                type: 'boolean',
            },
        },
        isLoading: {
            control: {
                type: 'boolean',
            },
        },
        isFullWidth: {
            control: {
                type: 'boolean',
            },
        },
        icon: {
            options: {
                'No icon': null,
                ...variables.ICONS.reduce((acc, icon) => ({ ...acc, [icon]: icon }), {}),
            },
            control: {
                type: 'select',
            },
        },
        iconSize: {
            control: {
                type: 'number',
            },
        },
        iconAlignment: {
            control: {
                type: 'radio',
            },
            options: ['left', 'right'],
        },
        title: {
            control: { type: 'text' },
        },
        ...framePropsStory.argTypes,
    },
};
