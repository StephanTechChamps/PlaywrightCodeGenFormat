import {Page, test} from "@playwright/test";
import {LoginPage} from "../../pom/auth/loginPage";
import {BASE_URL, PASSWORD, USERNAME} from "../../config/projectConfig";
import {VehicleType} from "../../enums/vehicleType";
import {expect} from "../../fixtures/tests.fixtures";
import {ctbExpectedDataForEquipmentAGV} from "../../test-data/equipment/ctb/ctbAGVEquipment";
import {expectedDataForEquipmentAGVAfterImport} from "../../test-data/equipment/ctb/ctbAGVEquipmentWithImportedData"
import {Duration} from "../../config/duration"

import {HomePage} from "../../pom/navigation/homePage";
import {EquipmentOverviewPage} from "../../pom/equipment/equipmentOverviewPage";
import {ExportEquipmentFormPage} from "../../pom/equipment/exportEquipmentFormPage";
import {EquipmentTable} from "../../pom/equipment/equipmentTable";
import {ConfirmDeleteEquipmentFormPage} from "../../pom/equipment/confirmDeleteEquipmentFormPage";
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
    const confirmDeleteEquipmentFormPage = new ConfirmDeleteEquipmentFormPage(page);
    return {homePage, equipmentOverviewPage, exportEquipmentFormPage, equipmentTable, confirmDeleteEquipmentFormPage};
}

function setAllureProperties() {
    severity("Critical");
    tag("Smoke");
    label("suite", "Import equipment");
}

test("TEAMS-46730: Import file and delete AGV equipment",
    {
        tag: ["@ctb", "@smoke", "@regression"]
    }, async ({page}) => {

        const {homePage, equipmentTable, equipmentOverviewPage, confirmDeleteEquipmentFormPage} = setupPages(page);
        const actualData = await equipmentTable.getActualEquipmentTableDataForAGV();
        await homePage.selectVehicleType(VehicleType.AGV);
        expect(actualData).toEqual(ctbExpectedDataForEquipmentAGV)

        await equipmentOverviewPage.importAllEquipmentFromCtbFile("ctbAGV611.csv");
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForAGV();
        }, {timeout: Duration.VeryLong}).toEqual(expectedDataForEquipmentAGVAfterImport);

        await equipmentOverviewPage.searchEquipment('AGV611')
        await equipmentTable.deleteEquipment("AGV611");
        await confirmDeleteEquipmentFormPage.confirmDeleteEquipment()
        await equipmentOverviewPage.clearSearchInput();

        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForAGV();
        }, {timeout: Duration.VeryLong}).toEqual(ctbExpectedDataForEquipmentAGV);
    });

