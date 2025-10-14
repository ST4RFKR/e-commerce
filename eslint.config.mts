import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        ignores: [
            "**/node_modules/**",
            "**/.next/**",
            "**/public/**",
            "**/prisma/**",
            "**/app/generated/**",
            "**/*.d.ts",
            "**/vite-env.d.ts",
            "**/css.d.ts",
            "**/*.min.js",
            "**/dist/**",
            "**/build/**",
            "**/out/**",
            "**/coverage/**",
            "**/*.config.js",
            "**/*.config.ts",
            "**/.next/types/**"
        ]
    },
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        plugins: {
            js,
            react: pluginReact,
            "react-hooks": pluginReactHooks,
        },
        extends: ["js/recommended", tseslint.configs.recommended],
        languageOptions: { globals: globals.browser },
        rules: {
            "react/react-in-jsx-scope": "off",
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
            "@typescript-eslint/triple-slash-reference": "off"
        },
        settings: {
            react: {
                version: "detect",
                "jsx-runtime": "automatic",
            },
        },
    },
]);
