import { mergeConfig, UserConfig } from 'vite';

import { ENVS } from '../build_utils/config';
import { ERR_NO_BE_ENV_FLAG } from '../build_utils/config/logs';

export default {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)', '../src/**/*.mdx'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
    '@storybook/addon-storysource',
    'storybook-addon-render-modes',
  ],
  framework: '@storybook/react-vite',
  viteFinal: (config: UserConfig) => {
    if (!process.env.BE_ENV) {
      throw new Error(ERR_NO_BE_ENV_FLAG);
    }

    return mergeConfig(config, {
      mode: process.env.BE_ENV || ENVS.PROD,
      optimizeDeps: {
        include: ['@storybook/addon-essentials', '@storybook/addon-links'],
      },
    });
  },
};
