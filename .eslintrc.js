module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    plugins: [
        'import',
        '@typescript-eslint'
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 8,
        sourceType: 'module',
        allowImportExportEverywhere: true
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.ts']
            }
        }
    },
    env: {
        node: true
    },
    rules: {
        'no-extra-bind': 'error',
        'no-cond-assign': [
            'error',
            'always'
        ],
        'eqeqeq': [
            'warn',
            'smart'
        ],
        'block-scoped-var': 'error',
        'guard-for-in': 'error',
        'no-loop-func': 'off',
        '@typescript-eslint/no-loop-func': 'error',
        'no-self-compare': 'error',
        'no-use-before-define': 'off',
        'no-unneeded-ternary': 'error',
        'no-prototype-builtins': 'off',
        'no-extend-native': 'error',
        'padding-line-between-statements': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/padding-line-between-statements': [
            'error',
            {
                'blankLine': 'always',
                'prev': 'import',
                'next': '*'
            },
            {
                'blankLine': 'any',
                'prev': 'import',
                'next': 'import'
            }
        ],
        'comma-dangle': 'off',
        '@typescript-eslint/comma-dangle': [
            'error',
            'always-multiline'
        ],
        'quotes': 'off',
        '@typescript-eslint/quotes': [
            'error',
            'single'
        ],
        'semi': 'off',
        '@typescript-eslint/semi': [
            'error',
            'always'
        ],
        'curly': [
            'error',
            'multi-line'
        ],
        'lines-between-class-members': 'off',
        '@typescript-eslint/lines-between-class-members': [
            'error',
            'always',
            {
                'exceptAfterSingleLine': true
            }
        ],
        'padded-blocks': [
            'error',
            'never'
        ],
        'object-curly-spacing': 'off',
        '@typescript-eslint/object-curly-spacing': [
            'error',
            'always'
        ],
        'array-bracket-spacing': [
            'error',
            'never'
        ],
        'comma-spacing': 'off',
        '@typescript-eslint/comma-spacing': [
            'error',
            {
                'before': false,
                'after': true
            }
        ],
        'space-infix-ops': 'off',
        '@typescript-eslint/space-infix-ops': 'error',
        'keyword-spacing': 'off',
        '@typescript-eslint/keyword-spacing': [
            'error',
            {
                'before': true,
                'after': true
            }
        ],
        'comma-style': [
            'error',
            'last'
        ],
        'space-before-blocks': 'error',
        'arrow-spacing': [
            'error',
            {
                'before': true,
                'after': true
            }
        ],
        'brace-style': 'off',
        '@typescript-eslint/brace-style': [
            'error',
            '1tbs',
            {
                'allowSingleLine': true
            }
        ],
        'template-curly-spacing': [
            'error',
            'never'
        ],
        'prefer-template': 'error',
        'no-useless-concat': 'error',
        'no-duplicate-imports': 'off',
        '@typescript-eslint/no-duplicate-imports': 'error',
        'no-param-reassign': [
            'error',
            {
                'props': false
            }
        ],
        'new-parens': [
            'error',
            'always'
        ],
        'default-param-last': 'off',
        '@typescript-eslint/default-param-last': 'error',
        'no-useless-computed-key': [
            'error',
            {
                'enforceForClassMembers': true
            }
        ],
        'dot-notation': 'off',
        '@typescript-eslint/dot-notation': 'off',
        'import/default': 'error',
        'import/namespace': 'error',
        'import/no-absolute-path': 'error',
        'import/no-self-import': 'error',
        'import/no-useless-path-segments': 'error',
        'import/export': 'error',
        'import/no-deprecated': 'warn',
        'import/first': 'error',
        'import/order': [
            'error',
            {
                pathGroups: [
                    {
                        pattern: '~/**',
                        group: 'external',
                        position: 'after'
                    }
                ],
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling'
                ]
            }
        ],
        'import/newline-after-import': 'error',
        'indent': 'off',
        '@typescript-eslint/indent': [
            'error',
            4,
            {
                'SwitchCase': 1,
                'ignoredNodes': [
                    'FunctionExpression > .params[decorators.length > 0]',
                    'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
                    'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key'
                ]
            }
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'arrow-parens': [
            'warn',
            'always'
        ],
        '@typescript-eslint/explicit-member-accessibility': [
            'error',
            {
                'accessibility': 'explicit',
                'overrides': {'constructors': 'no-public'}
            }
        ],
        '@typescript-eslint/explicit-function-return-type': [
            'error',
            {
                'allowExpressions': false
            }
        ],
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                'multiline': {
                    'delimiter': 'semi',
                    'requireLast': true
                },
                'singleline': {
                    'delimiter': 'comma',
                    'requireLast': false
                },
                'multilineDetection': 'brackets'
            }
        ],
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/ban-ts-comment': 'off'
    }
};
