import {defineConfig, devices} from '@playwright/test';
import {BASE_URL} from "./config/projectConfig";

export default defineConfig({
    testDir: './tests',

    timeout: 60000,
    expect: {
        timeout: 30000,
    },
    use: {
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        video: 'retain-on-failure',

        actionTimeout: 10000,
        navigationTimeout: 30000,

    baseURL: BASE_URL,
    storageState: '.aut/login.json',   // gebruik de login state
    },

    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,

    reporter: [
        ['line'],
        ['allure-playwright', {outputFolder: 'allure-results'}],
        ['html']
    ],

    globalSetup: './global-setup.ts',

    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome']
            }
        },
    ],

});
