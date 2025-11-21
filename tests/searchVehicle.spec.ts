import { test } from "@playwright/test";
import { HomePage } from "../pom/navigation/homePage";
import { LoginPage } from "../pom/auth/loginPage";
import { BASE_URL, USERNAME, PASSWORD } from "../fixtures/projectConfig";
import {VehicleType} from "../fixtures/vehicleType";

test.use({ ignoreHTTPSErrors: true });

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(BASE_URL, USERNAME, PASSWORD);
});

test("Search a vehicle", async ({ page  }) => {
    const homePage = new HomePage(page);
    await homePage.insertInInputField(VehicleType.A_RMG)
});
