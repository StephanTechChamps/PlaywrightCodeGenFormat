import {Page} from '@playwright/test';
import {LoginPage} from "./pom/auth/loginPage";
import {Teams} from "./pom/navigation/teams";
import { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig,page: Page) {
    console.info('🔧 Global setup started');

    const playwrightDev1 = new Teams(page);
    await  page.goto("https://teamssrvse01.de.ad.tba.nl:9303/")
    await playwrightDev1.selectEquipmentApp();

    const playwrightDev = new LoginPage(page);
    // await playwrightDev.login("admin","donotusethisaccountfortesting");

    await page.context().storageState({path: 'storageState.json'});




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

