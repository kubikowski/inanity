/* eslint-disable @typescript-eslint/naming-convention */
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import { configs } from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import { defineConfig } from 'eslint/config';
import eslintPluginImport from 'eslint-plugin-import';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: configs.recommended,
	allConfig: configs.all,
});

export default defineConfig([ {
	files: [ '**/*.ts' ],
	extends: compat.extends(
		'eslint:recommended',
		'plugin:@angular-eslint/recommended',
		'plugin:@angular-eslint/template/process-inline-templates',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
	),
	plugins: {
		'@stylistic': stylistic,
		'import': fixupPluginRules(eslintPluginImport),
	},
	languageOptions: {
		parser: tsParser,
		ecmaVersion: 'latest',
		sourceType: 'module',
		parserOptions: {
			project: [ 'tsconfig.json' ],
			createDefaultProgram: true,
		},
	},
	rules: {
		'@typescript-eslint/explicit-member-accessibility': [ 'error', {
			accessibility: 'explicit',
		} ],
		'@typescript-eslint/member-ordering': [ 'error', {
			default: [ 'field', 'constructor', 'method' ],
		} ],
		'@typescript-eslint/naming-convention': [ 'error', {
			selector: 'default',
			format: [ 'camelCase' ],
		}, {
			selector: 'function',
			format: [ 'camelCase', 'PascalCase' ],
		}, {
			selector: 'parameter',
			format: [ 'camelCase' ],
			leadingUnderscore: 'allow',
		}, {
			selector: 'variable',
			format: [ 'camelCase', 'PascalCase', 'UPPER_CASE' ],
			modifiers: [ 'const' ],
			leadingUnderscore: 'allow',
		}, {
			selector: 'property',
			format: [ 'camelCase' ],
			modifiers: [ 'private' ],
			leadingUnderscore: 'allow',
		}, {
			selector: 'property',
			format: [ 'camelCase' ],
			modifiers: [ 'protected' ],
			leadingUnderscore: 'allow',
		}, {
			selector: 'property',
			format: [ 'camelCase', 'PascalCase', 'UPPER_CASE' ],
			modifiers: [ 'private', 'static' ],
			leadingUnderscore: 'allow',
		}, {
			selector: 'property',
			format: [ 'camelCase', 'PascalCase', 'UPPER_CASE' ],
			modifiers: [ 'protected', 'static' ],
			leadingUnderscore: 'allow',
		}, {
			selector: 'property',
			format: [ 'camelCase', 'PascalCase', 'UPPER_CASE' ],
			modifiers: [ 'private', 'readonly' ],
			leadingUnderscore: 'allow',
		}, {
			selector: 'property',
			format: [ 'camelCase', 'PascalCase', 'UPPER_CASE' ],
			modifiers: [ 'protected', 'readonly' ],
			leadingUnderscore: 'allow',
		}, {
			selector: 'property',
			format: [ 'camelCase', 'PascalCase', 'UPPER_CASE' ],
			modifiers: [ 'readonly' ],
		}, {
			selector: 'parameterProperty',
			format: [ 'camelCase' ],
			modifiers: [ 'private' ],
			leadingUnderscore: 'allow',
		}, {
			selector: 'parameterProperty',
			format: [ 'camelCase' ],
			modifiers: [ 'protected' ],
			leadingUnderscore: 'allow',
		}, {
			selector: 'typeLike',
			format: [ 'PascalCase' ],
		}, {
			selector: 'enumMember',
			format: [ 'UPPER_CASE' ],
		}, {
			selector: [
				'classProperty',
				'objectLiteralProperty',
				'typeProperty',
				'classMethod',
				'objectLiteralMethod',
				'typeMethod',
				'accessor',
				'enumMember',
			],
			format: null,
			modifiers: [ 'requiresQuotes' ],
		} ],
		'@typescript-eslint/no-explicit-any': 'error',
		'@typescript-eslint/no-shadow': 'error',
		'@typescript-eslint/no-unused-vars': [ 'error', {
			args: 'all',
			argsIgnorePattern: '^_',
			caughtErrors: 'all',
			caughtErrorsIgnorePattern: '^_',
			destructuredArrayIgnorePattern: '^_',
			varsIgnorePattern: '^_',
			ignoreRestSiblings: true,
		} ],
		'@stylistic/comma-dangle': [ 'error', 'always-multiline' ],
		'@stylistic/member-delimiter-style': [ 'error', {
			multiline: {
				delimiter: 'semi',
				requireLast: true,
			},
			singleline: {
				delimiter: 'comma',
				requireLast: false,
			},
		} ],
		'@stylistic/semi': 'error',
		'array-bracket-spacing': [ 'error', 'always' ],
		'arrow-body-style': [ 'error', 'as-needed' ],
		'arrow-parens': [ 'error', 'as-needed' ],
		'brace-style': 'error',
		'func-style': [ 'error', 'declaration' ],
		'import/order': [ 'error', {
			alphabetize: {
				order: 'asc',
				caseInsensitive: true,
			},
		} ],
		'indent': [ 'error', 'tab', {
			'SwitchCase': 1,
		} ],
		'max-len': 'off',
		'no-useless-escape': 'off',
		'object-curly-spacing': [ 'error', 'always' ],
		'prefer-const': 'error',
		'prefer-template': 'error',
		'quotes': [ 'error', 'single' ],
	},
}, {
	files: [ '**/*.html' ],
	extends: compat.extends(
		'plugin:@angular-eslint/template/recommended',
		'plugin:@angular-eslint/template/accessibility',
	),
} ]);
