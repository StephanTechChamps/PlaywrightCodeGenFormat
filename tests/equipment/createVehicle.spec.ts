import {HomePage} from "../../pom/navigation/homePage";
import {LoginPage} from "../../pom/auth/loginPage";
import {BASE_URL, PASSWORD, USERNAME} from "../../config/projectConfig";
import {expect, test} from '../../fixtures/tests.fixtures'
import {label, severity, tag} from "allure-js-commons";
import {VehicleType} from "../../enums/vehicleType";
import {AddEquipmentFormPage} from "../../pom/equipment/addForm/addEquipmentFormPage";
import {AddAcsFormPage} from "../../pom/equipment/addForm/addAcsFormPage";
import {Page} from "@playwright/test";
import {expectedDataForEquipmentAGV} from "../../test-data/equipment/ctb/ctbAGVEquipment";
import {ctbValidateCreatedAGV} from "../../test-data/equipment/ctb/ctbValidateCreatedAGV";
import {EquipmentTable} from "../../pom/equipment/equipmentTable";
import {Timeouts} from "../../config/timeouts";
import {ConfirmDeleteEquipmentFormPage} from "../../pom/equipment/confirmDeleteEquipmentFormPage"
import {ctbValidateCreatedQC} from "../../test-data/equipment/ctb/ctbValidateCreatedQc";
import {expectedDataForQc} from "../../test-data/equipment/ctb/ctbExpectedDataForQc";
import {expectedDataForAcs} from "../../test-data/equipment/ctb/ctbAcsEquipment";
import {expectedDataForAcsAfterImport} from "../../test-data/equipment/ctb/ctbAcsEquipmentWithImportedData";
import {AddAgvFormPage} from "../../pom/equipment/addForm/addAgvFormPage";
import {AddQCFormPage} from "../../pom/equipment/addForm/addQCFormPage";

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
    const acsFormPage = new AddAcsFormPage(page);
    const agvFormPage = new AddAgvFormPage(page);
    const qcFormPage = new AddQCFormPage(page);
    return {homePage, equipmentFormPage, equipmentTable, confirmDeleteEquipmentFormPage, acsFormPage,agvFormPage,qcFormPage};

}

// test("Create a A-RMG (only essential fields)", async ({page}) => {
//     const {homePage, equipmentFormPage} = setupPages(page);
//     await homePage.selectVehicleType(VehicleType.A_RMG);
//     await equipmentFormPage.createARMG(
//         'Test A-RMG', 300, 200, 3000, "1.4", 'vet', 20);
//     // expect(await )
// });

test("Create and delete AGV equipment (only essential fields)", async ({page}) => {
        const {homePage, equipmentTable, confirmDeleteEquipmentFormPage, agvFormPage} = setupPages(page);
        await homePage.selectVehicleType(VehicleType.AGV);
        const actualData = await equipmentTable.getActualEquipmentTableDataForAGV();

        expect(actualData).toEqual(expectedDataForEquipmentAGV)

        await agvFormPage.createAGV("Test AGV", 203, "v2", "Creative", 10, 96000);
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


test("Create and delete QC equipment (only essential fields)", async ({page}) => {
        const {homePage, equipmentTable, confirmDeleteEquipmentFormPage,qcFormPage} = setupPages(page);
        await homePage.selectVehicleType(VehicleType.QC);
        const actualData = await equipmentTable.getActualEquipmentTableDataForQC();

        expect(actualData).toEqual(expectedDataForQc);

        await qcFormPage.createQC(
            "Test QC", 203, 3, "TestLane", 50, "Low", "Center", "High",
            45, "V2", "test", "www.koneCranes.com");

        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForQC();
        }, {timeout: Timeouts.Short}).toEqual(ctbValidateCreatedQC);

        await equipmentTable.deleteEquipment("Test QC");
        await confirmDeleteEquipmentFormPage.confirmDeleteEquipment();
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForQC();
        }, {timeout: Timeouts.Medium}).toEqual(expectedDataForQc);
    }
)

// test needs work with locator fields of table
test("Create and delete ACS equipment (only essential fields)", async ({page}) => {
    const {homePage, equipmentTable, confirmDeleteEquipmentFormPage,acsFormPage} = setupPages(page);
    await homePage.selectVehicleType(VehicleType.ACS);
    await equipmentTable.navigateToTablePage(2)
    const actualData = await equipmentTable.getActualEquipmentTableDataForACS();

    expect(actualData).toEqual(expectedDataForAcs);

    await acsFormPage.createACS(
        "Test ACS", "new", 60, 80, 2000,
        5, 99990, "test location", 5, 1,
        40000, 7, 43);

    await expect.poll(async () => {
        return await equipmentTable.getActualEquipmentTableDataForACS();
    }, {timeout: Timeouts.Medium}).toEqual(expectedDataForAcsAfterImport);

    await equipmentTable.deleteEquipment("Test ACS");
    await confirmDeleteEquipmentFormPage.confirmDeleteEquipment();
    await expect.poll(async () => {
        return await equipmentTable.getActualEquipmentTableDataForACS();
    }, {timeout: Timeouts.Medium}).toEqual(expectedDataForAcs);
});

// expect(actualData).toEqual(ctbQcEquipmen
// await equipmentFormPage.createASTRAD("Test A-STRAD", 4000, 600, "1.20202", "Lion-o", 600);

// test("Create a A-RTG (only essential fields)", async ({page}) => {
//     const {homePage, equipmentFormPage} = setupPages(page);
//
//     await homePage.selectVehicleType(VehicleType.A_RTG);
//     await equipmentFormPage.createARTG("Test A-RTG", 10, 30, 600, "d-10", "panthro", 45);
// })

// test("Create a MSC (only essential fields)", async ({page}) => {
//     const {homePage, equipmentFormPage} = setupPages(page);
//
//     await homePage.selectVehicleType(VehicleType.MSC);
//     await equipmentFormPage.createMSC("Test MSC", 45, 600, "dssd", "Cheetarah", 808);
// })