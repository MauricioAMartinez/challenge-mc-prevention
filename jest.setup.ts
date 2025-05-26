import '@testing-library/jest-dom'

// jest.setup.ts
Object.defineProperty(window, 'grecaptcha', {
  writable: true,
  configurable: true,
  value: {
    execute: jest.fn(() => Promise.resolve('mock-token')),
    render: jest.fn(),
    ready: jest.fn((cb) => cb()),
  },
});
