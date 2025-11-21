import {HomePage} from "../pom/navigation/homePage";
import {LoginPage} from "../pom/auth/loginPage";
import {BASE_URL, PASSWORD, USERNAME} from "../fixtures/projectConfig";
import {test} from '../fixtures/tests.fixtures'
import {label, severity, tag} from "allure-js-commons";
import {VehicleType} from "../fixtures/vehicleType";
import {Page} from "@playwright/test";
import {EquipmentOverviewPage} from "../pom/equipment/equipmentOverviewPage";
import {ExportEquipmentFormPage} from "../pom/equipment/exportEquipmentFormPage"

test.use({ignoreHTTPSErrors: true});

test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(BASE_URL, USERNAME, PASSWORD);
    setAllureProperties();
});

function setupPages(page: Page) {
    const homePage = new HomePage(page);
    const equipmentOverviewPage = new EquipmentOverviewPage(page)
    const exportEquipmentFormPage = new ExportEquipmentFormPage(page);
    return {homePage, equipmentOverviewPage, exportEquipmentFormPage};
}

function setAllureProperties() {
    severity("Critical");
    tag("Smoke");
    label("suite", "Import equipment");
}

test("Import REACH STACKER equipment from a file", async ({page}) => {
    const {homePage, equipmentOverviewPage} = setupPages(page);
    await homePage.selectVehicleType(VehicleType.REACH_STACKER);
    await equipmentOverviewPage.importAllEquipmentFromFile("REACH_STACKER_IMPORT.csv")
});

test("Import A-RMG equipment from a file", async ({page}) => {
    const {homePage, equipmentOverviewPage} = setupPages(page);
    await homePage.selectVehicleType(VehicleType.A_RMG);
    await equipmentOverviewPage.importAllEquipmentFromFile("A_RMG_IMPORT.csv")
});
