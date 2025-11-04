// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',

    timeout: 60000,
    expect: {
        timeout: 30000,
    },
    use: {
        // Belangrijk voor debugging:
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        video: 'retain-on-failure',

        actionTimeout: 10000,
        navigationTimeout: 30000,
    },

    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,

    reporter: [
        ['line'],
        ['allure-playwright', { outputFolder: 'allure-results' }],
        ['html']
    ],

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        // Extra browsers kunnen later weer aan.
    ],

    // webServer: { ... },
});
