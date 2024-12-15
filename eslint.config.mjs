import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
    //Tell Lint we want access to browser globals.
    {
        languageOptions: {
            globals: globals.browser
        }
    },
    //Disable unused parameter checking.
    {
        rules: {
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    "args": "none"
                }
            ]
        }
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    eslintConfigPrettier,
];