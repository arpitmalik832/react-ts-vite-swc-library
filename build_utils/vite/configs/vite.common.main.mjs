/**
 * This is the Vite configuration file.
 * @file This file is saved as `vite.config.js`.
 */
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import svgr from 'vite-plugin-svgr';
import compression from 'vite-plugin-compression';
import postcssPresetEnvPlugin from 'postcss-preset-env';
import autoprefixerPlugin from 'autoprefixer';

import svgrConfig from '../../../svgr.config.mjs';
import stripCustomWindowVariablesPlugin from '../customPlugins/stripCustomWindowVariablesPlugin.mjs';
import { ENVS } from '../../config/index.mjs';
import copyPlugin from '../customPlugins/copyPlugin.mjs';
import importStylesPlugin from '../customPlugins/importStylesPlugin.mjs';
import { entryPath } from '../../config/commonPaths.mjs';
import { pathChecks } from '../utils/pathUtils.mjs';

const config = {
  plugins: [
    svgr({
      svgrOptions: svgrConfig,
      include: '**/*.svg',
    }),
    react(),
    dts({
      rollupTypes: true,
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
      staticImport: true,
      outDir: 'dist',
      entryRoot: 'src',
      outputDir: '../',
      insertTypesEntry: true,
    }),
    [ENVS.PROD, ENVS.BETA].includes(process.env.LIB_ENV) &&
      stripCustomWindowVariablesPlugin({
        variables: ['abc'],
      }),
    importStylesPlugin(),
    copyPlugin(),
    compression({
      deleteOriginFile: false,
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],
  define: {
    'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV),
    'process.env.PUBLIC_URL': JSON.stringify(process.env.PUBLIC_URL),
  },
  esbuild: {
    drop: process.env.LIB_ENV === ENVS.PROD ? ['debugger'] : [],
  },
  css: {
    postcss: {
      plugins: [postcssPresetEnvPlugin, autoprefixerPlugin],
    },
  },
  build: {
    outDir: 'dist',
    minify: [ENVS.PROD, ENVS.BETA].includes(process.env.LIB_ENV),
    sourcemap: ![ENVS.PROD, ENVS.BETA].includes(process.env.LIB_ENV),
    lib: {
      entry: [entryPath],
    },
    rollupOptions: {
      external: [/node_modules/],
      output: [
        {
          format: 'esm',
          entryFileNames: `esm/lib.js`,
          assetFileNames: assetInfo => {
            if (assetInfo.name.endsWith('.css')) {
              return `index.css`;
            }
            return `esm/assets/[name].[ext]`;
          },
          path: id => pathChecks(id),
        },
        {
          format: 'cjs',
          entryFileNames: `cjs/lib.js`,
          assetFileNames: assetInfo => {
            if (assetInfo.name.endsWith('.css')) {
              return `index.css`;
            }
            return `cjs/assets/[name].[ext]`;
          },
          path: id => pathChecks(id),
        },
      ],
    },
  },
};

export default config;
