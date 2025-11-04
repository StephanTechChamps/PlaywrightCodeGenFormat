import {HomePage} from "../pom/homePage";
import {LoginPage} from "../pom/loginPage";
import {BASE_URL, PASSWORD, USERNAME} from "../fixtures/projectConfig";
import {test} from '../fixtures/tests.fixtures'
import {label, severity, tag} from "allure-js-commons";
import {VehicleType} from "../fixtures/vehicleType";
import {AddEquipmentFormPage} from "../pom/addEquipmentFormPage";

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

test("Create a vehicle", async ({page}) => {
    await setAllureProperties();
    const homePage = new HomePage(page);
    const equipmentFormPage = new AddEquipmentFormPage(page);
    await homePage.selectVehicleType(VehicleType.A_RMG);
    await equipmentFormPage.createARMG('Vehicle 123', 300, 200, 3000, "1.4", 'vet', 20);
});

