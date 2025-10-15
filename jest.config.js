import { createDefaultPreset } from "ts-jest";

/** @type {import("jest").Config} */
const tsJestTransformCfg = createDefaultPreset().transform;

const config = {
    testEnvironment: "node",
    transform: {
        ...tsJestTransformCfg,
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    moduleDirectories: ["node_modules", "<rootDir>/src"],
};

export default config;
