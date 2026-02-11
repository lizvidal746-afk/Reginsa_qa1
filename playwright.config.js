// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  testIgnore: ['**/_referencias/**'],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  timeout: 120000,
  expect: { timeout: 15000 },
  globalSetup: './tests/global-setup.js',
  reporter: [
    ['line'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['allure-playwright', { outputFolder: 'allure-results' }],
    ['junit', { outputFile: 'test-results/junit.xml' }]
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    navigationTimeout: 30000,
    actionTimeout: 20000,
    storageState: 'storageState.json',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});
