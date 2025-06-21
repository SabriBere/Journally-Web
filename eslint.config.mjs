import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginTestingLibrary from "eslint-plugin-testing-library";
import eslintPluginJest from "eslint-plugin-jest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
    {
        files: ["src/**/*.{js,ts,jsx,tsx}"],
        plugins: {
            import: eslintPluginImport,
            "react-hooks": eslintPluginReactHooks,
            "testing-library": eslintPluginTestingLibrary,
        },

        // Reglas generales del proyecto
        rules: {
            eqeqeq: "error",
            "no-var": "error",
            "no-console": "off",
            "require-await": "warn",
            "no-unused-vars": "warn",
            "no-inline-comments": "off",
            "import/no-unresolved": "warn",
            "no-duplicate-imports": "warn",
            "array-callback-return": "off",
            "react-hooks/exhaustive-deps": "off",
        },
    },
    // Reglas específicas para archivos de test
    {
        files: ["**/*.test.{js,ts,jsx,tsx}", "**/__tests__/**/*.{js,ts,jsx,tsx}"],
        plugins: {
            "testing-library": eslintPluginTestingLibrary,
            jest: eslintPluginJest,
        },
        rules: {
            // Testing Library
            "testing-library/no-unnecessary-act": ["off", { isStrict: true }],

            // Jest
            "jest/expect-expect": "warn",
            "jest/no-disabled-tests": "warn",
            "jest/no-identical-title": "error",
            "jest/prefer-to-have-length": "warn",
            "jest/valid-expect": "error",
        },
    },
];

export default eslintConfig;
