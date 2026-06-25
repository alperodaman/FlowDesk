import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "node",

        include: [
            "src/**/*.test.ts",
            "tests/**/*.test.ts"
        ],

        setupFiles: [
            "./tests/setup.ts"
        ],

        clearMocks: true,
        restoreMocks: true,

        testTimeout: 10_000,
        hookTimeout: 10_000
    }
});