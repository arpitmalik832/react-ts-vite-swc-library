import { Args, StoryContext, StoryFn } from '@storybook/react';

import '../static/styles/postcss-processed/index.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story: StoryFn, context: StoryContext<Args>) => (
    <div style={{ margin: '3em' }}>{Story(context.args, context)}</div>
  ),
];
