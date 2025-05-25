import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginTestingLibrary from "eslint-plugin-testing-library";

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
            "testing-library/no-unnecessary-act": ["off", { isStrict: true }],
        },
    },
];

export default eslintConfig;
