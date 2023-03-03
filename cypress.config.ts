import { defineConfig } from 'cypress'

export default defineConfig({
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    specPattern: '**/cypress/__tests__/*.spec.tsx',
    viewportHeight: 1280,
    viewportWidth: 800,
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: '**/cypress/e2e/*.spec.ts',
  },
  video: false,
})
