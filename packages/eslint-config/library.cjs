const {resolve} = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/strict-type-checked', 'prettier', 'eslint-config-turbo'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'only-warn'],
    parserOptions: {
        project: true
    },
    globals: {
        React: true,
        JSX: true
    },
    env: {
        node: true
    },
    settings: {
        'import/resolver': {
            typescript: {
                project
            }
        }
    },
    ignorePatterns: [
        // Ignore dotfiles
        '.*.js',
        'node_modules/',
        'dist/'
    ],
    overrides: [
        {
            files: ['*.js?(x)', '*.ts?(x)']
        }
    ]
};
