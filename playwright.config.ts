import { defineConfig, devices } from "@playwright/test";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./e2e-tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  // Webserver to run the tests against
  webServer: {
    command: "npm run start",
    url: "http://127.0.0.1:3000",
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },

  // Defining default URL for the tests
  use: {
    baseURL: "http://localhost:3000/",
    trace: "on-first-retry",
  },

  projects: [
    // Authentication setup
    {
      name: "setup",
      testMatch: /auth\.setup\.ts/,
    },

    // Chrome browser tests
    {
      name: "chrome-unauthenticated",
      use: { ...devices["Desktop Chrome"] },
      testMatch: /.*\/(index|login|signup)\.spec\.ts/,
    },
    {
      name: "chrome-authenticated",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/user.json",
      },
      testMatch: /.*\/(dashboard|customers|invoices|settings)\.spec\.ts/,
      dependencies: ["setup"],
    },

    // Firefox browser tests
    {
      name: "firefox-unauthenticated",
      use: { ...devices["Desktop Firefox"] },
      testMatch: /.*\/(index|login|signup)\.spec\.ts/,
    },
    {
      name: "firefox-authenticated",
      use: {
        ...devices["Desktop Firefox"],
        storageState: "playwright/.auth/user.json",
      },
      testMatch: /.*\/(dashboard|customers|invoices|settings)\.spec\.ts/,
      dependencies: ["setup"],
    },

    // Safari browser tests
    {
      name: "webkit-unauthenticated",
      use: { ...devices["Desktop Safari"] },
      testMatch: /.*\/(index|login|signup)\.spec\.ts/,
    },
    {
      name: "webkit-authenticated",
      use: {
        ...devices["Desktop Safari"],
        storageState: "playwright/.auth/user.json",
      },
      testMatch: /.*\/(dashboard|customers|invoices|settings)\.spec\.ts/,
      dependencies: ["setup"],
    },
  ],
});
