import {HomePage} from "../../pom/navigation/homePage";
import {expect, test} from '../../fixtures/tests.fixtures'
import {label, severity, tag} from "allure-js-commons";
import {VehicleType} from "../../enums/vehicleType";
import {Page} from "@playwright/test";
import {EquipmentOverviewPage} from "../../pom/equipment/equipmentOverviewPage";
import {ExportEquipmentFormPage} from "../../pom/equipment/exportEquipmentFormPage"
import {htcExpectedDataForEquipmentARMG} from "../../test-data/equipment/htc/htcEquipmentTestDataForARMG"
import {EquipmentTable} from "../../pom/equipment/equipmentTable";
import {expectedDataForEquipmentACS} from "../../test-data/equipment/htc/equipmentTestDataForACS";
import {equipmentTableRowDataForACS} from "../../interfaces/equipment/equipmentTableRowDataForACS";
import {ctbExpectedDataForEquipmentAGV} from "../../test-data/equipment/ctb/ctbAGVEquipment";
import {expectedDataForReachStacker} from "../../test-data/equipment/htc/equipmentTestDataForReachStacker";
import {expectedDataForRemoteOperatingStation} from "../../test-data/equipment/htc/equipmentTestDataForRemoteOperatingStation";
import {ctbExpectedDataForQc} from "../../test-data/equipment/ctb/ctbExpectedDataForQc";
import {Tag} from "../../enums/tag";
import {ctbValidateCreatedQC} from "../../test-data/equipment/ctb/ctbValidateCreatedQc";
import {DURATION} from "../../config/DURATION";
import {expectedDataForEquipmentAGVAfterImport} from "../../test-data/equipment/ctb/ctbAGVEquipmentWithImportedData";
import {ConfirmDeleteEquipmentFormPage} from "../../pom/equipment/confirmDeleteEquipmentFormPage";

test.use({ignoreHTTPSErrors: true});

test.beforeEach(async ({page}) => {
    await page.goto("/");
    await setAllureProperties();
});

function setupPages(page: Page) {
    const homePage = new HomePage(page);
    const equipmentOverviewPage = new EquipmentOverviewPage(page)
    const exportEquipmentFormPage = new ExportEquipmentFormPage(page);
    const equipmentTable = new EquipmentTable(page)
    const confirmDeleteEquipmentFormPage = new ConfirmDeleteEquipmentFormPage(page);
    return {homePage, equipmentOverviewPage, exportEquipmentFormPage, equipmentTable, confirmDeleteEquipmentFormPage};
}

async function setAllureProperties() {
    await severity("Critical");
    await tag("Smoke");
    await label("suite", "Import equipment");
}

// test("Import REACH STACKER equipment from a file", async ({page}) => {
//     const {homePage, equipmentOverviewPage} = setupPages(page);
//     await homePage.selectVehicleType(VehicleType.REACH_STACKER);
//     await equipmentOverviewPage.importAllEquipmentFromFile("REACH_STACKER_IMPORT.csv")
// });

test("BUG: TEAMS-46730: Import file and delete AGV equipment",
    {
        tag: [Tag.CTB, Tag.SMOKE, Tag.REGRESSION]
    }, async ({page}) => {

        const {homePage, equipmentTable, equipmentOverviewPage, confirmDeleteEquipmentFormPage} = setupPages(page);
        const actualData = await equipmentTable.getActualEquipmentTableDataForAGV();
        await homePage.selectVehicleType(VehicleType.AGV);
        expect(actualData).toEqual(ctbExpectedDataForEquipmentAGV)

        await equipmentOverviewPage.importAllEquipmentFromCtbFile("ctbAGV611.csv");
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForAGV();
        }, {timeout: DURATION.VERY_LONG}).toEqual(expectedDataForEquipmentAGVAfterImport);

        await equipmentOverviewPage.searchEquipment('AGV611')
        await equipmentTable.deleteEquipment("AGV611");
        await confirmDeleteEquipmentFormPage.confirmDeleteEquipment()
        await equipmentOverviewPage.clearSearchInput();

        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForAGV();
        }, {timeout: DURATION.VERY_LONG}).toEqual(ctbExpectedDataForEquipmentAGV);
    });


test("Import A-RMG equipment from a file",
    {
        tag: [Tag.HTC, Tag.SMOKE, Tag.REGRESSION]
    }, async ({page}) => {
        const {homePage, equipmentOverviewPage} = setupPages(page);
        await homePage.selectVehicleType(VehicleType.A_RMG);
        await equipmentOverviewPage.importAllEquipmentFromHtcFile("A_RMG_IMPORT.csv")
    });

test("Import QC equipment from a file",
    {
        tag: [Tag.SMOKE, Tag.CTB, Tag.REGRESSION]
    }, async ({page}) => {
        const {homePage, equipmentOverviewPage, equipmentTable} = setupPages(page);
        await homePage.selectVehicleType(VehicleType.QC);

        const actualData = await equipmentTable.getActualEquipmentTableDataForQC();
        expect(actualData).toEqual(ctbExpectedDataForQc)

        await equipmentOverviewPage.importAllEquipmentFromCtbFile("expect/ctbImportQCdata.csv")

        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForQC();
        }, {timeout: DURATION.VERY_LONG}).toEqual(ctbValidateCreatedQC);
    });


test("Verify test data for A-RMG",
    {
        tag: [Tag.HTC, Tag.REGRESSION],
    }, async ({page}) => {
        const {homePage, equipmentTable} = setupPages(page);
        await homePage.selectVehicleType(VehicleType.A_RMG);
        const actualData = await equipmentTable.getActualEquipmentTableDataForARMG();
        expect(actualData).toEqual(htcExpectedDataForEquipmentARMG)
    });


test("Verify test data for ACS",
    {
        tag: [Tag.CTB, Tag.SMOKE, Tag.REGRESSION]
    }, async ({page}) => {
        const {homePage, equipmentTable} = setupPages(page);
        await homePage.selectVehicleType(VehicleType.ACS);
        const actualData: equipmentTableRowDataForACS[] = await equipmentTable.getActualEquipmentTableDataForACS();
        expect(actualData).toEqual(expectedDataForEquipmentACS)
    });

test("Verify test data for AGV",
    {
        tag: [Tag.CTB, Tag.SMOKE, Tag.REGRESSION]
    }, async ({page}) => {
        const {homePage, equipmentTable} = setupPages(page);
        await homePage.selectVehicleType(VehicleType.AGV);
        const actualData = await equipmentTable.getActualEquipmentTableDataForAGV();
        expect(actualData).toEqual(ctbExpectedDataForEquipmentAGV)

    })

test("Verify test data for QC",
    {
        tag: [Tag.CTB, Tag.SMOKE, Tag.REGRESSION]
    }, async ({page}) => {
        const {homePage, equipmentTable} = setupPages(page);
        await homePage.selectVehicleType(VehicleType.QC);
        const actualData = await equipmentTable.getActualEquipmentTableDataForQC();
        expect(actualData).toEqual(ctbExpectedDataForQc)
    });

test("Verify test data for Reach-stacker",
    {
        tag: [Tag.HTC, Tag.SMOKE, Tag.REGRESSION]
    }, async ({page}) => {
        const {homePage, equipmentTable} = setupPages(page);
        await homePage.selectVehicleType(VehicleType.REACH_STACKER);
        const actualData = await equipmentTable.getActualEquipmentTableDataForReachStacker();
        expect(actualData).toEqual(expectedDataForReachStacker)
    })

test("Verify test data for Remote operating Station",
    {
        tag: [Tag.HTC, Tag.SMOKE, Tag.REGRESSION]
    }, async ({page}) => {
        const {homePage, equipmentTable} = setupPages(page);
        await homePage.selectVehicleType(VehicleType.REMOTE_OPERATING_STATION);
        const actualData = await equipmentTable.getActualEquipmentTableDataForRemoteOperatingStation();
        expect(actualData).toEqual(expectedDataForRemoteOperatingStation)
    })