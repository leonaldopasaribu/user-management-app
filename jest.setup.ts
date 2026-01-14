import '@testing-library/jest-dom';

// Mock import.meta.env
Object.defineProperty(global, 'import', {
  value: {
    meta: {
      env: {
        VITE_API_BASE_URL: 'https://jsonplaceholder.typicode.com',
        VITE_AVATAR_BASE_URL: 'https://picsum.photos/seed',
      },
    },
  },
});

// Mock env module
jest.mock('~/config/env', () => ({
  env: {
    API_BASE_URL: 'https://jsonplaceholder.typicode.com',
    AVATAR_BASE_URL: 'https://picsum.photos/seed',
  },
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;
