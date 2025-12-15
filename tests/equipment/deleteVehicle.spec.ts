import {test} from "../../fixtures/tests.fixtures";
import {LoginPage} from "../../pom/auth/loginPage";
import {BASE_URL, PASSWORD, USERNAME} from "../../config/projectConfig";
import {label, severity, tag} from "allure-js-commons";
import {HomePage} from "../../pom/navigation/homePage";
import {VehicleType} from "../../enums/vehicleType";
import {EquipmentOverviewPage} from "../../pom/equipment/equipmentOverviewPage";
import {EquipmentTable} from "../../pom/equipment/equipmentTable";
import {Page} from "@playwright/test";
import {ExportEquipmentFormPage} from "../../pom/equipment/exportEquipmentFormPage";

test.use({ignoreHTTPSErrors: true});


test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(BASE_URL, USERNAME, PASSWORD);
    await setAllureProperties();
});

async function setAllureProperties() {
    await severity('Critical');
    await tag('Regression');
    await label('suite', "Remove equipment");
}

function setupPages(page: Page) {
    const homePage = new HomePage(page);
    const equipmentOverviewPage = new EquipmentOverviewPage(page)
    const exportEquipmentFormPage = new ExportEquipmentFormPage(page);
    const equipmentTable = new EquipmentTable(page)
    return {homePage, equipmentOverviewPage, exportEquipmentFormPage, equipmentTable};
}

test("Delete equipment-type A-RMG", async ({page}) => {
    const {homePage, equipmentTable} = setupPages(page);
    await homePage.selectVehicleType(VehicleType.A_RMG);
    await equipmentTable.deleteEquipment("AL01");
});

test("Delete equipment-type MSC", async ({page}) => {
    const {homePage, equipmentTable} = setupPages(page);
    await homePage.selectVehicleType(VehicleType.MSC);
    await equipmentTable.deleteEquipment("SH01");
})

test("Delete equipment-type QC", async ({page}) => {
    const {homePage, equipmentTable} = setupPages(page);
    await homePage.selectVehicleType(VehicleType.QC);
    await equipmentTable.deleteEquipment("QC01");
})

test("Delete equipment-type REACH-STACKER", async ({page}) => {
    const {homePage, equipmentTable} = setupPages(page);
    await homePage.selectVehicleType(VehicleType.REACH_STACKER);
    await equipmentTable.deleteEquipment("RS01");
})

test("Delete equipment-type Terminal Truck", async ({page}) => {
    const {homePage, equipmentTable} = setupPages(page);

    await homePage.selectVehicleType(VehicleType.TERMINAL_TRUCK);
    await equipmentTable.deleteEquipment("TT01");
})