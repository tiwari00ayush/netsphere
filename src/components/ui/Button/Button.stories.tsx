import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';
import { ArrowRight } from 'lucide-react';

const meta: Meta<typeof Button> = {
  component: Button,
  args: {
    children: 'Button',
    variant: 'default',
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
};

export const WithLeftIcon: Story = {
  args: {
    children: (
      <>
        Github
        <ArrowRight />
      </>
    ),
  },
};
