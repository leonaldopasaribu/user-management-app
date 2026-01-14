import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  roots: ['<rootDir>/app'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx',
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          verbatimModuleSyntax: false,
          module: 'ESNext',
          target: 'ESNext',
          moduleResolution: 'bundler',
        },
        useESM: true,
        diagnostics: {
          ignoreCodes: [1343],
        },
      },
    ],
  },
  moduleNameMapper: {
    '^~/config/env$': '<rootDir>/__mocks__/env.ts',
    '^~/(.*)$': '<rootDir>/app/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  globals: {
    'import.meta': {
      env: {
        VITE_API_BASE_URL: 'https://jsonplaceholder.typicode.com',
        VITE_AVATAR_BASE_URL: 'https://picsum.photos/seed',
      },
    },
  },
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    '!app/**/*.d.ts',
    '!app/routes.ts',
    '!app/root.tsx',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/__tests__/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
};

export default config;
