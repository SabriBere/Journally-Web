import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginTestingLibrary from "eslint-plugin-testing-library";
import eslintPluginQuery from "@tanstack/eslint-plugin-query";
import eslintPluginJest from "eslint-plugin-jest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),

    // Reglas generales del proyecto
    {
        files: ["src/**/*.{js,ts,jsx,tsx}"],
        plugins: {
            import: eslintPluginImport,
            "react-hooks": eslintPluginReactHooks,
            "testing-library": eslintPluginTestingLibrary,
            "@tanstack/query": eslintPluginQuery,
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
            "@tanstack/query/exhaustive-deps": "warn", //parametros de querys bien definidos
            "@tanstack/query/prefer-query-object-syntax": "warn", // permite usar { queryKey, queryFn }
            //regla a probar
            // "@tanstack/query/stable-query-client": "warn", //evitar usar queryClient en cada render
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

            // Jest - Reglas para test robustos
            "jest/expect-expect": "warn", //evita que no haya expect
            "jest/no-disabled-tests": "warn", //avisa si hay un test comentado o skip
            "jest/no-identical-title": "error", //impide tener dos test con el mismo nombre
            "jest/prefer-to-have-length": "warn", //obliga a usar toHaveLength
            "jest/valid-expect": "error", //evita fallas silenciosas por falta de matcher
            //otras reglas a probar
            // "jest/no-commented-out-tests": "warn",
            // "jest/prefer-to-be": "warn", //en vez de to equal
            // "jest/prefer-to-contain": "warn", //en vez de includes
            // "jest/consistent-test-it": ["warn", { fn: "test" }], //obliga a usar it en vez de test
            // "jest/require-top-level-describe": "warn" //que tenga un describe dela to nivel que envuelva al test
        },
    },
];

export default eslintConfig;
