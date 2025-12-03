import {Page, test} from "@playwright/test";
import {LoginPage} from "../pom/auth/loginPage";
import {BASE_URL, PASSWORD, USERNAME} from "../config/projectConfig";
import {VehicleType} from "../enums/vehicleType";
import {expect} from "../fixtures/tests.fixtures";
import {ctbQcEquipment} from "../test-data/equipment/ctb/ctbQcEquipment";
import {expectedDataForEquipmentAGV} from "../test-data/equipment/ctb/ctbAGVEquipment";

import {HomePage} from "../pom/navigation/homePage";
import {EquipmentOverviewPage} from "../pom/equipment/equipmentOverviewPage";
import {ExportEquipmentFormPage} from "../pom/equipment/exportEquipmentFormPage";
import {EquipmentTable} from "../pom/equipment/equipmentTable";
import {label, severity, tag} from "allure-js-commons";

test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(BASE_URL, USERNAME, PASSWORD);
    setAllureProperties();
});

function setupPages(page: Page) {
    const homePage = new HomePage(page);
    const equipmentOverviewPage = new EquipmentOverviewPage(page)
    const exportEquipmentFormPage = new ExportEquipmentFormPage(page);
    const equipmentTable = new EquipmentTable(page)
    return {homePage, equipmentOverviewPage, exportEquipmentFormPage, equipmentTable};
}

function setAllureProperties() {
    severity("Critical");
    tag("Smoke");
    label("suite", "Import equipment");
}

test("Test bugfix", async ({page}) => {
    const {homePage, equipmentTable,equipmentOverviewPage} = setupPages(page);
    await homePage.selectVehicleType(VehicleType.AGV);
    const actualData = await equipmentTable.getActualEquipmentTableDataForAGV();
    expect(actualData).toEqual(expectedDataForEquipmentAGV)
    await equipmentOverviewPage.importAllEquipmentFromCtbFile("ctbAGV611.csv");
    expect(actualData).toEqual(expectedDataForEquipmentAGV)
});

