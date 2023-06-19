const nextJest = require("next/jest");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(process.cwd(), ".env.test"),
});

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/$1",
  },
  testTimeout: 20000,
  collectCoverageFrom: ["**/*.(t|j)s", "**/*.tsx"],
  coveragePathIgnorePatterns: [
    "node_modules",
    "public",
    "coverage",
    "<rootDir>/jest.config.js",
    "<rootDir>/jest.setup.js",
    "<rootDir>/next.config.js",
    "<rootDir>/pages/index.tsx",
    "<rootDir>/pages/_app.tsx",
    "<rootDir>/server.local.ts",
    "<rootDir>/.next",
    "<rootDir>/.swc",
  ],
  coverageReporters: ["clover", "json", "lcov", "text", "json-summary"],
};

module.exports = createJestConfig(customJestConfig);
