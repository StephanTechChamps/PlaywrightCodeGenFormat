import {test} from "../fixtures/tests.fixtures";
import {LoginPage} from "../pom/loginPage";
import {BASE_URL, PASSWORD, USERNAME} from "../fixtures/projectConfig";
import {label, severity, tag} from "allure-js-commons";
import {HomePage} from "../pom/homePage";
import {VehicleType} from "../fixtures/vehicleType";
import {equipmentOverviewPage} from "../pom/equipmentOverviewPage";

test.use({ignoreHTTPSErrors: true});

// Log in before each test in this file
test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(BASE_URL, USERNAME, PASSWORD);
});

async function setAllureProperties() {
    await severity('Critical');
    await tag('Smoke');
    await label('suite', "Login tests");
}

test("Delete a vehicle", async ({page}) => {
    await setAllureProperties();
    const homePage = new HomePage(page);
    const overviewPage = new equipmentOverviewPage(page);
    await homePage.selectVehicleType(VehicleType.A_RMG);
    await overviewPage.deleteEquipment("AL01");
});