import { test } from "@playwright/test";
import { HomePage } from "../pom/homePage";
import { LoginPage } from "../pom/loginPage";
import { BASE_URL, USERNAME, PASSWORD } from "../fixtures/projectConfig";

// Apply common settings once for this file
test.use({ ignoreHTTPSErrors: true });

// Log in before each test in this file
test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(BASE_URL, USERNAME, PASSWORD);
});

test("create vehicle", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.createVehicle();
});

