import {Page, test as base} from '@playwright/test';
import {LoginPage} from "../pom/loginPage";
import {Teams} from "../pom/teams";
import { FullConfig } from '@playwright/test';
import fs from 'fs';

async function globalSetup(config: FullConfig,page: Page) {
    console.info('🔧 Global setup started');

    const playwrightDev1 = new Teams(page);
    await  page.goto("https://teamssrvse01.de.ad.tba.nl:9303/")
    await playwrightDev1.selectEquipmentApp();

    const playwrightDev = new LoginPage(page);
    // await playwrightDev.login("admin","donotusethisaccountfortesting");

    await page.context().storageState({path: 'storageState.json'});


    // Voorbeeld: login en sla sessie op
    // const browser = await chromium.launch();
    // const page = await browser.newPage();
    // await page.goto('https://example.com/login');
    // await page.fill('#username', 'user');
    // await page.fill('#password', 'pass');
    // await page.click('button[type="submit"]');
    // await page.context().storageState({ path: 'storageState.json' });
    // await browser.close();

    console.log('✅ Setup voltooid');
}

export default globalSetup;






// export const test = base.extend({
// });
//
// test.beforeAll(async ({page}) => {
//     const playwrightDev1 = new Teams(page);
//     await  page.goto("https://teamssrvse01.de.ad.tba.nl:9303/")
//     await playwrightDev1.selectEquipmentApp();
//
//     const playwrightDev = new LoginPage(page);
//     await playwrightDev.login("admin","donotusethisaccountfortesting");
// });
//
// test.afterAll(async () => {
//     console.info('Globale teardown ná alle tests');
// });

