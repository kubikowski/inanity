import {defineConfig} from "eslint/config";
import _import from "eslint-plugin-import";
import {fixupPluginRules} from "@eslint/compat";
import stylistic from "@stylistic/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import {fileURLToPath} from "node:url";
import js from "@eslint/js";
import {FlatCompat} from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
});

export default defineConfig([
	{
		files: ["**/*.js"],
		extends: compat.extends("eslint:recommended"),

		plugins: {
			import: fixupPluginRules(_import),
		},

		languageOptions: {
			globals: {},
			ecmaVersion: "latest",
			sourceType: "module",
		},

		rules: {
			"array-bracket-spacing": ["error", "always"],
			"arrow-body-style": ["error", "as-needed"],
			"arrow-parens": ["error", "as-needed"],
			"brace-style": "error",
			"comma-dangle": ["error", "always-multiline"],
			"func-style": ["error", "declaration"],

			"import/order": ["error", {
				alphabetize: {
					order: "asc",
					caseInsensitive: true,
				},
			}],

			indent: ["error", "tab", {
				SwitchCase: 1,
			}],

			"max-len": "off",
			"no-shadow": "error",
			"no-var": "error",
			"no-void": "error",
			"no-undefined": "error",
			"object-curly-spacing": ["error", "always"],
			"prefer-const": "error",
			"prefer-template": "error",
			quotes: ["error", "single"],
			semi: "error",
		},
	},
	{
		files: ["**/*.ts"],

		extends: compat.extends(
			"eslint:recommended",
			"plugin:@typescript-eslint/eslint-recommended",
			"plugin:@typescript-eslint/recommended",
			"plugin:@typescript-eslint/recommended-requiring-type-checking",
		),

		plugins: {
			"@stylistic": stylistic,
			import: fixupPluginRules(_import),
		},

		languageOptions: {
			parser: tsParser,
			ecmaVersion: 5,
			sourceType: "module",

			parserOptions: {
				project: ["tsconfig.json"],
				createDefaultProgram: true,
			},
		},

		rules: {
			"@stylistic/comma-dangle": ["error", "always-multiline"],

			"@typescript-eslint/explicit-member-accessibility": ["error", {
				accessibility: "explicit",
			}],

			"@stylistic/member-delimiter-style": ["error", {
				multiline: {
					delimiter: "semi",
					requireLast: true,
				},

				singleline: {
					delimiter: "comma",
					requireLast: false,
				},
			}],

			"@typescript-eslint/member-ordering": ["error", {
				default: ["field", "constructor", "method"],
			}],

			"@typescript-eslint/naming-convention": [
				"error",
			{
				selector: "default",
				format: ["camelCase"],
			}, {
				selector: "function",
				format: ["camelCase", "PascalCase"],
			}, {
				selector: "parameter",
				format: ["camelCase"],
				leadingUnderscore: "allow",
			}, {
				selector: "variable",
				format: ["camelCase", "PascalCase", "UPPER_CASE"],
				modifiers: ["const"],
				leadingUnderscore: "allow",
			}, {
				selector: "property",
				format: ["camelCase"],
				modifiers: ["private"],
				leadingUnderscore: "allow",
			}, {
				selector: "property",
				format: ["camelCase"],
				modifiers: ["protected"],
				leadingUnderscore: "allow",
			}, {
				selector: "property",
				format: ["camelCase", "PascalCase", "UPPER_CASE"],
				modifiers: ["private", "static"],
				leadingUnderscore: "allow",
			}, {
				selector: "property",
				format: ["camelCase", "PascalCase", "UPPER_CASE"],
				modifiers: ["protected", "static"],
				leadingUnderscore: "allow",
			}, {
				selector: "property",
				format: ["camelCase", "PascalCase", "UPPER_CASE"],
				modifiers: ["private", "readonly"],
				leadingUnderscore: "allow",
			}, {
				selector: "property",
				format: ["camelCase", "PascalCase", "UPPER_CASE"],
				modifiers: ["protected", "readonly"],
				leadingUnderscore: "allow",
			}, {
				selector: "property",
				format: ["camelCase", "PascalCase", "UPPER_CASE"],
				modifiers: ["readonly"],
			}, {
				selector: "parameterProperty",
				format: ["camelCase"],
				modifiers: ["private"],
				leadingUnderscore: "allow",
			}, {
				selector: "parameterProperty",
				format: ["camelCase"],
				modifiers: ["protected"],
				leadingUnderscore: "allow",
			}, {
				selector: "typeLike",
				format: ["PascalCase"],
			}, {
				selector: "enumMember",
				format: ["UPPER_CASE"],
			}, {
				selector: [
					"classProperty",
					"objectLiteralProperty",
					"typeProperty",
					"classMethod",
					"objectLiteralMethod",
					"typeMethod",
					"accessor",
					"enumMember",
				],

				format: null,
				modifiers: ["requiresQuotes"],
			}],

			"@typescript-eslint/no-explicit-any": "error",
			"@stylistic/no-floating-promises": "off",
			"@stylistic/no-misused-promises": "off",
			"@stylistic/no-non-null-assertion": "off",
			"@typescript-eslint/no-shadow": "error",
			"array-bracket-spacing": ["error", "always"],

			"@typescript-eslint/no-unused-vars": ["error", {
				args: "all",
				argsIgnorePattern: "^_",
				caughtErrors: "all",
				caughtErrorsIgnorePattern: "^_",
				destructuredArrayIgnorePattern: "^_",
				varsIgnorePattern: "^_",
				ignoreRestSiblings: true,
			}],

			"arrow-body-style": ["error", "as-needed"],
			"arrow-parens": ["error", "as-needed"],
			"brace-style": "error",
			"func-style": ["error", "declaration"],

			"import/order": ["error", {
				alphabetize: {
					order: "asc",
					caseInsensitive: true,
				},
			}],

			indent: ["error", "tab", {
				SwitchCase: 1,
			}],

			"max-len": "off",
			"no-var": "error",
			"no-useless-escape": "off",
			"object-curly-spacing": ["error", "always"],
			"prefer-const": "error",
			"prefer-template": "error",
			quotes: ["error", "single"],
			"@stylistic/semi": "error",
		},
	},
	{
		files: ["**/*.html"],
		extends: compat.extends("plugin:@angular-eslint/template/recommended"),

		rules: {
			"@angular-eslint/template/no-negated-async": "off",
			"@angular-eslint/template/eqeqeq": "error",
		},
	},
]);
