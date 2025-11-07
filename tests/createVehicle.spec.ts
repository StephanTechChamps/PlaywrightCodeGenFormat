import {HomePage} from "../pom/navigation/homePage";
import {LoginPage} from "../pom/auth/loginPage";
import {BASE_URL, PASSWORD, USERNAME} from "../fixtures/projectConfig";
import {test} from '../fixtures/tests.fixtures'
import {label, severity, tag} from "allure-js-commons";
import {VehicleType} from "../fixtures/vehicleType";
import {AddEquipmentFormPage} from "../pom/equipment/addEquipmentFormPage";
import {Page} from "@playwright/test";

test.use({ignoreHTTPSErrors: true});

// Log in before each test in this file
test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(BASE_URL, USERNAME, PASSWORD);
    await setAllureProperties();
});

async function setAllureProperties() {
    await severity('Critical');
    await tag('Smoke');
    await label('suite', "Login tests");
}

function setupPages(page: Page) {
    const homePage = new HomePage(page);
    const equipmentFormPage = new AddEquipmentFormPage(page);
    return { homePage, equipmentFormPage };
}

test("Create a A-RMG (only essential fields)", async ({page}) => {
    const { homePage, equipmentFormPage } = setupPages(page);
    await homePage.selectVehicleType(VehicleType.A_RMG);
    await equipmentFormPage.createARMG('Test A-RMG', 300, 200, 3000, "1.4", 'vet', 20);
});

test("Create a AGV (only essential fields)", async ({page}) => {
    const { homePage, equipmentFormPage } = setupPages(page);
    await homePage.selectVehicleType(VehicleType.AGV);
    await equipmentFormPage.createAGV("Test AGV", 203, "v2", "Creative", 10, 96000);
})

test("Create a A-STRAD (only essential fields)", async ({page}) => {
    const { homePage, equipmentFormPage } = setupPages(page);

    await homePage.selectVehicleType(VehicleType.A_STRAD);
    await equipmentFormPage.createASTRAD("Test A-STRAD", 4000, 600, "1.20202", "Lion-o", 600);
})

test("Create a A-RTG (only essential fields)", async ({page}) => {
    const { homePage, equipmentFormPage } = setupPages(page);

    await homePage.selectVehicleType(VehicleType.A_RTG);
    await equipmentFormPage.createARTG("Test A-RTG", 10, 30, 600, "d-10", "panthro", 45);
})

test("Create a MSC (only essential fields)", async ({page}) => {
    const { homePage, equipmentFormPage } = setupPages(page);

    await homePage.selectVehicleType(VehicleType.MSC);
    await equipmentFormPage.createMSC("Test MSC", 45, 600, "dssd", "Cheetarah", 808);
})

// test("Create a QC (only essential fields)", async ({page}) => {
//     const homePage = new HomePage(page);
//     const equipmentFormPage = new AddEquipmentFormPage(page);
//     await homePage.selectVehicleType(VehicleType.QC)
//     await equipmentFormPage.createQC("Test QC", 444, "dssd", "WhileyKid", 808);
// })