const reactPlugin = require('eslint-plugin-react');
const reactRecommended = require('eslint-plugin-react/configs/recommended');
const globals = require('globals');

module.exports = [
  {
    ...reactRecommended,
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parserOptions: {
          ecmaFeatures: {
              jsx: true,
          },
      },
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
    },
    rules: {
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/react-in-jsx-scope': 'off',
    },
    plugins: {
        react: reactPlugin,
    },
  },
];