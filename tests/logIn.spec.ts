import { test, expect } from '@playwright/test';
import {LoginPage} from "../pom/auth/loginPage"



test.use({
    ignoreHTTPSErrors: true
});

test('test', async ({ page }) => {
    const playwrightDev = new LoginPage(page);
});