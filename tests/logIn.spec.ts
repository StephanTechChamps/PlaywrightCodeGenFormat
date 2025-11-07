import { test, expect } from '@playwright/test';
import {LoginPage} from "../pom/auth/loginPage"



test.use({
    ignoreHTTPSErrors: true
});

test('test', async ({ page }) => {
    const playwrightDev = new LoginPage(page);
});    // await playwrightDev.login('https://teamssrvse01.de.ad.tba.nl:9119/realms/TEAMS/protocol/openid-connect/auth?response_type=code&redirect_uri=https%3A%2F%2Fteamssrvse01.de.ad.tba.nl%3A9311%2Fauth%2Fsso%2Fcallback&scope=profile%20roles%20openid&state=BxRwVIYlDdcQit2JipVctsJr&client_id=equipment-management#/',);
