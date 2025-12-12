import {HomePage} from "../../pom/navigation/homePage";
import {LoginPage} from "../../pom/auth/loginPage";
import {BASE_URL, PASSWORD, USERNAME} from "../../config/projectConfig";
import {expect, test} from '../../fixtures/tests.fixtures'
import {label, severity, tag} from "allure-js-commons";
import {VehicleType} from "../../enums/vehicleType";
import {AddEquipmentFormPage} from "../../pom/equipment/addEquipmentFormPage";
import {Page} from "@playwright/test";
import {expectedDataForEquipmentAGV} from "../../test-data/equipment/ctb/ctbAGVEquipment";
import {ctbValidateCreatedAGV} from "../../test-data/equipment/ctb/ctbValidateCreatedAGV";
import {EquipmentTable} from "../../pom/equipment/equipmentTable";
import {Timeouts} from "../../config/timeouts";
import {ConfirmDeleteEquipmentFormPage} from "../../pom/equipment/confirmDeleteEquipmentFormPage"
import {ctbValidateCreatedQC} from "../../test-data/equipment/ctb/ctbValidateCreatedQc";
import {ctbQcEquipment} from "../../test-data/equipment/ctb/ctbQcEquipment";

test.use({ignoreHTTPSErrors: true});

test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(BASE_URL, USERNAME, PASSWORD);
    await setAllureProperties();
});

async function setAllureProperties() {
    await severity('Critical');
    await tag('Smoke');
    await label('suite', "Create equipment");
}

function setupPages(page: Page) {
    const homePage = new HomePage(page);
    const equipmentFormPage = new AddEquipmentFormPage(page);
    const equipmentTable = new EquipmentTable(page)
    const confirmDeleteEquipmentFormPage = new ConfirmDeleteEquipmentFormPage(page);
    return {homePage, equipmentFormPage, equipmentTable, confirmDeleteEquipmentFormPage};

}

// test("Create a A-RMG (only essential fields)", async ({page}) => {
//     const {homePage, equipmentFormPage} = setupPages(page);
//     await homePage.selectVehicleType(VehicleType.A_RMG);
//     await equipmentFormPage.createARMG(
//         'Test A-RMG', 300, 200, 3000, "1.4", 'vet', 20);
//     // expect(await )
// });

test("Create and delete AGV (only essential fields)", async ({page}) => {
        const {homePage, equipmentFormPage, equipmentTable, confirmDeleteEquipmentFormPage} = setupPages(page);
        await homePage.selectVehicleType(VehicleType.AGV);
        const actualData = await equipmentTable.getActualEquipmentTableDataForAGV();

        expect(actualData).toEqual(expectedDataForEquipmentAGV)

        await equipmentFormPage.createAGV("Test AGV", 203, "v2", "Creative", 10, 96000);
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForAGV();
        }, {timeout: Timeouts.Short}).toEqual(ctbValidateCreatedAGV);

        await equipmentTable.deleteEquipment("Test AGV");
        await confirmDeleteEquipmentFormPage.confirmDeleteEquipment();
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForAGV();
        }, {timeout: Timeouts.Long}).toEqual(expectedDataForEquipmentAGV);
    }
)


test("Create and delete QC (only essential fields)", async ({page}) => {
        const {homePage, equipmentFormPage, equipmentTable, confirmDeleteEquipmentFormPage} = setupPages(page);
        await homePage.selectVehicleType(VehicleType.QC);
        const actualData = await equipmentTable.getActualEquipmentTableDataForQC();

        expect(actualData).toEqual(ctbQcEquipment);

        await equipmentFormPage.createQC(
            "Test QC", 203, 3, "TestLane", 50, "Low", "Center", "High",
            45, "V2", "test", "www.koneCranes.com");

    await expect.poll(async () => {
        return await equipmentTable.getActualEquipmentTableDataForQC();
    }, {timeout: Timeouts.Short}).toEqual(ctbValidateCreatedQC);

        await equipmentTable.deleteEquipment("Test QC");
        await confirmDeleteEquipmentFormPage.confirmDeleteEquipment();
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForQC();
        }, {timeout: Timeouts.Medium}).toEqual(ctbQcEquipment);
    }
)


// test("Create a A-STRAD (only essential fields)", async ({page}) => {
//     const {homePage, equipmentFormPage} = setupPages(page);
//     await homePage.selectVehicleType(VehicleType.A_STRAD);
//     await equipmentFormPage.createASTRAD("Test A-STRAD", 4000, 600, "1.20202", "Lion-o", 600);
// })
//
// test("Create a A-RTG (only essential fields)", async ({page}) => {
//     const {homePage, equipmentFormPage} = setupPages(page);
//
//     await homePage.selectVehicleType(VehicleType.A_RTG);
//     await equipmentFormPage.createARTG("Test A-RTG", 10, 30, 600, "d-10", "panthro", 45);
// })
//
// test("Create a MSC (only essential fields)", async ({page}) => {
//     const {homePage, equipmentFormPage} = setupPages(page);
//
//     await homePage.selectVehicleType(VehicleType.MSC);
//     await equipmentFormPage.createMSC("Test MSC", 45, 600, "dssd", "Cheetarah", 808);
// })