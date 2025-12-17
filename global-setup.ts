import {LoginPage} from "./pom/auth/loginPage";
import { FullConfig } from '@playwright/test';
import {BASE_URL, PASSWORD, USERNAME} from "./config/projectConfig";
import {chromium} from "playwright";

async function globalSetup(config: FullConfig) {
    console.info('🔧 Global setup started');

    const browser = await chromium.launch();
    const context = await browser.newContext({
        baseURL: BASE_URL
    });

    const page = await context.newPage();

    console.info('Login process started');

    const loginPage = new LoginPage(page);
    await page.goto(BASE_URL)

    console.info('Enter login credentials')

    await loginPage.login(BASE_URL, USERNAME, PASSWORD)
    await page.context().storageState({path: ".aut/login.json"});

    console.log('Login successful, end of global setup');
}
export default globalSetup;


