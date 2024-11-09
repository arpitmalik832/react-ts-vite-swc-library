/**
 * ESLint configuration file.
 * For more info, pls refer: http://eslint.org/docs/user-guide/configuring.
 */
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'plugin:css-modules/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
    'plugin:storybook/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: [
    'css-modules',
    'import',
    'jsx-a11y',
    'prettier',
    'react',
    'react-hooks',
    'storybook',
    '@typescript-eslint',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
      },
    },
  },
  rules: {
    // rules regarding react plugin
    'react/react-in-jsx-scope': 0,
    'react/function-component-definition': 0,
    'react/prop-types': 0,
    'react/jsx-filename-extension': [0, { extensions: ['.tsx'] }],
    'react/require-default-props': 0,
    // rules regarding react-hooks plugin
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 0,
    // rules regarding css-modules plugin
    'css-modules/no-unused-class': [2, { camelCase: true }],
    'css-modules/no-undef-class': [2, { camelCase: true }],
    // Forbid the use of extraneous packages
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    'import/no-extraneous-dependencies': [2, { packageDir: '.' }],
    'import/prefer-default-export': 0,
    'import/extensions': [
      2,
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    // ESLint plugin for prettier formatting
    // https://github.com/prettier/eslint-plugin-prettier
    'prettier/prettier': [
      1,
      {
        endOfLine: 'lf',
      },
    ],
    // Ensure <a> tags are valid
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md
    'jsx-a11y/anchor-is-valid': 2,
    // rules regarding no-console
    'no-console': 2,
    'no-debugger': 2,
    'no-unused-vars': 2,
    'prefer-destructuring': 2,
    'func-names': 2,
    camelcase: 0,
  },
  overrides: [
    {
      files: ['**/*.js', '**/*.cjs', '**/*.mjs', '**/*.jsx'],
      parser: '@babel/eslint-parser',
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: [
            [
              '@babel/preset-react',
              {
                runtime: 'automatic',
              },
            ],
            '@babel/preset-env',
          ],
        },
      },
      extends: [
        'airbnb',
        'plugin:css-modules/recommended',
        'plugin:jsx-a11y/recommended',
        'prettier',
        'plugin:storybook/recommended',
      ],
      plugins: [
        'css-modules',
        'import',
        'jsx-a11y',
        'prettier',
        'react',
        'react-hooks',
        'storybook',
      ],
      settings: {
        'import/resolver': {
          node: {
            extensions: ['.js', '.jsx'],
          },
        },
      },
      rules: {
        // rules regarding react plugin
        'react/react-in-jsx-scope': 0,
        'react/function-component-definition': 0,
        'react/prop-types': 0,
        // rules regarding react-hooks plugin
        'react-hooks/rules-of-hooks': 2,
        'react-hooks/exhaustive-deps': 0,
        // rules regarding css-modules plugin
        'css-modules/no-unused-class': [2, { camelCase: true }],
        'css-modules/no-undef-class': [2, { camelCase: true }],
        // Forbid the use of extraneous packages
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
        'import/no-extraneous-dependencies': [2, { packageDir: '.' }],
        'import/prefer-default-export': 0,
        // ESLint plugin for prettier formatting
        // https://github.com/prettier/eslint-plugin-prettier
        'prettier/prettier': [
          1,
          {
            endOfLine: 'lf',
          },
        ],
        // Ensure <a> tags are valid
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md
        'jsx-a11y/anchor-is-valid': 2,
        // rules regarding no-console
        'no-console': 2,
        'no-debugger': 2,
        'no-unused-vars': 2,
        'prefer-destructuring': 2,
        'func-names': 2,
        camelcase: 0,
      },
    },
    {
      files: ['**/*.mdx', '**/*.md'],
      parser: 'eslint-mdx',
      extends: ['plugin:mdx/recommended'],
      plugins: ['mdx'],
      settings: {
        'mdx/code-blocks': true,
      },
      parserOptions: {
        extensions: ['.mdx', '.jsx', '.md', '.js'],
        markdownExtensions: ['.mdx', '.jsx', '.md', '.js'],
      },
      rules: {
        'react/jsx-filename-extension': [1, { extensions: ['.mdx'] }],
      },
    },
  ],
};
