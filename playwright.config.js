import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  // Folder containing all test files
  testDir: './tests',

  // Maximum time for each test
  timeout: 90000,

  // Run tests in parallel
  fullyParallel: true,

  // Retry failed tests once
  retries: 1,

  // HTML report
  reporter: [
    ['html', {
      open: 'never'
    }]
  ],

  use: {

    // Ignore SSL certificate issues on ShoppersStack
    ignoreHTTPSErrors: true,

    // Take screenshot only when a test fails
    screenshot: 'only-on-failure',

    // Record trace when the first retry happens
    trace: 'on-first-retry',

    // Record video only when a test fails
    video: 'retain-on-failure'
  },


  projects: [

    // Chromium
    {
      name: 'chromium',

      use: {
        ...devices['Desktop Chrome']
      }
    },


    // Firefox
    {
      name: 'firefox',

      use: {
        ...devices['Desktop Firefox']
      }
    },


    // WebKit
    {
      name: 'webkit',

      use: {
        ...devices['Desktop Safari']
      }
    }

  ]

});