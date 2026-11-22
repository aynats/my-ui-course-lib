import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import { Button } from './Button';
import { CalendarIcon } from '../CalendarIcon/CalendarIcon';

const meta = {
  title: 'Components/Button',

  component: Button,

  args: {
    as: 'button',
    children: 'Кнопка',
    variant: 'fill',
    size: 'M',
    density: 'default',
    disabled: false,
  },

  argTypes: {
    variant: {
      control: 'select',
      options: ['fill', 'outline', 'text'],
    },

    size: {
      control: 'select',
      options: ['S', 'M', 'L'],
    },

    density: {
      control: 'select',
      options: ['default', 'compact'],
    },

    children: {
      control: 'text',
    },

    disabled: {
      control: 'boolean',
    },

    as: {
      control: false,
    },

    startIcon: {
      control: false,
    },

    endIcon: {
      control: false,
    },

    ref: {
      control: false,
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithStartIcon: Story = {
  args: {
    variant: 'outline',
    density: 'compact',
    children: 'Сегодня',
  },

  render: (args) => (
    <Button
      {...args}
      startIcon={<CalendarIcon />}
    />
  ),
};