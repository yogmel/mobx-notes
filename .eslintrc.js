module.exports = {
  'env': {
    'browser': true, 
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'plugins': [
    'react',
    '@typescript-eslint'
  ],
  'rules': {
    // we only want single quotes
    'quotes': ['error', 'single'],
    // we want to force semicolons
    'semi': ['error', 'always'],
    // we use 2 spaces to indent our code
    'indent': ['error', 2],
    // we want to avoid useless spaces
    'no-multi-spaces': ['error']
  }
};
