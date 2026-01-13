import {expect, test} from '../../fixtures/tests.fixtures'
import {VehicleType} from "../../enums/vehicleType";
import {htcExpectedDataForEquipmentARMG} from "../../test-data/equipment/hct/htcEquipmentTestDataForARMG"
import {expectedDataForEquipmentACS} from "../../test-data/equipment/hct/equipmentTestDataForACS";
import {equipmentTableRowDataForACS} from "../../interfaces/equipment/equipmentTableRowDataForACS";
import {ctbExpectedDataForEquipmentAGV} from "../../test-data/equipment/ctb/ctbAGVEquipment";
import {expectedDataForReachStacker} from "../../test-data/equipment/hct/equipmentTestDataForReachStacker";
import {
    expectedDataForRemoteOperatingStation
} from "../../test-data/equipment/hct/equipmentTestDataForRemoteOperatingStation";
import {ctbExpectedDataForQc} from "../../test-data/equipment/ctb/expect/ctbExpectedDataForQc";
import {TestCategory} from "../../enums/TestCategory";
import {ctbValidateCreatedQC} from "../../test-data/equipment/ctb/created/ctbValidateCreatedQc";
import {Duration} from "../../config/Duration";
import {expectedDataForEquipmentAGVAfterImport} from "../../test-data/equipment/ctb/ctbAGVEquipmentWithImportedData";
import {setExportEquipmentLabels} from "../../helpers/setExportedAllureLabels";
import {Severity} from "../../enums/Severity";
import {Terminal} from "../../enums/Terminal";

test.use({ignoreHTTPSErrors: true});

// test("Import REACH STACKER equipment from a file", async ({page}) => {
//     const {homePage, equipmentOverviewPage} = setupPages(page);
//     await homePage.selectVehicleType(VehicleType.REACH_STACKER);
//     await equipmentOverviewPage.importAllEquipmentFromFile("REACH_STACKER_IMPORT.csv")
// });

test("BUG: TEAMS-46730: Import file and delete AGV equipment",
    {
        tag: [Terminal.CTB, TestCategory.SMOKE, TestCategory.REGRESSION]
    }, async ({homePage, equipmentTable, equipmentOverviewPage, confirmDeleteEquipmentFormPage}) => {
        await setExportEquipmentLabels(Severity.CRITICAL, TestCategory.REGRESSION, [{name: "suite", value: "Import equipment"}]);

        const actualData = await equipmentTable.getActualEquipmentTableDataForAGV();
        await homePage.selectVehicleType(VehicleType.AGV);
        await expect.poll(async () => {
            return actualData }, {timeout: Duration.MEDIUM}).toEqual(ctbExpectedDataForEquipmentAGV);

        await equipmentOverviewPage.importAllEquipmentFromCtbFile("ctbAGV611.csv");
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForAGV();
        }, {timeout: Duration.VERY_LONG}).toEqual(expectedDataForEquipmentAGVAfterImport);

        await equipmentOverviewPage.searchEquipment('AGV611')
        await equipmentTable.deleteEquipment("AGV611");
        await confirmDeleteEquipmentFormPage.confirmDeleteEquipment()
        await equipmentOverviewPage.clearSearchInput();
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForAGV();
        }, {timeout: Duration.VERY_LONG}).toEqual(ctbExpectedDataForEquipmentAGV);
    });


test("Import A-RMG equipment from a file",
    {
        tag: [Terminal.HCT, TestCategory.SMOKE, TestCategory.REGRESSION]
    }, async ({homePage, equipmentOverviewPage}) => {
        await setExportEquipmentLabels(Severity.CRITICAL, TestCategory.REGRESSION, [{name: "suite", value: "Import equipment"}]);

        await homePage.selectVehicleType(VehicleType.A_RMG);
        await equipmentOverviewPage.importAllEquipmentFromHtcFile("A_RMG_IMPORT.csv")
    });
// @TODO research if the import works or not / if it's backwards compatible
// Can't seem to create QC equipment in older versions
test("Import QC equipment from a file",
    {
        tag: [TestCategory.SMOKE, Terminal.CTB, TestCategory.REGRESSION]
    }, async ({homePage, equipmentOverviewPage, equipmentTable}) => {
        await setExportEquipmentLabels(Severity.TRIVIAL, TestCategory.REGRESSION, [{name: "suite", value: "Import equipment"}]);

        await homePage.selectVehicleType(VehicleType.QC);
        const actualData = await equipmentTable.getActualEquipmentTableDataForQC();
        expect(actualData).toEqual(ctbExpectedDataForQc)

        await equipmentOverviewPage.importAllEquipmentFromCtbFile("expect/ctbImportQCdata.csv")
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForQC();
        }, {timeout: Duration.VERY_LONG}).toEqual(ctbValidateCreatedQC);
    });


test("Verify test data for A-RMG",
    {
        tag: [Terminal.HCT, TestCategory.REGRESSION],
    }, async ({homePage, equipmentTable}) => {
        await setExportEquipmentLabels(Severity.TRIVIAL, TestCategory.REGRESSION, [{name: "suite", value: "Import equipment"}]);

        await homePage.selectVehicleType(VehicleType.A_RMG);
        const actualData = await equipmentTable.getActualEquipmentTableDataForARMG();
        expect(actualData).toEqual(htcExpectedDataForEquipmentARMG)
    });


test("Verify test data for ACS",
    {
        tag: [Terminal.CTB, TestCategory.SMOKE, TestCategory.REGRESSION]
    }, async ({homePage, equipmentTable}) => {
        await setExportEquipmentLabels(Severity.TRIVIAL, TestCategory.REGRESSION, [{name: "suite", value: "Import equipment"}]);

        await homePage.selectVehicleType(VehicleType.ACS);
        const actualData: equipmentTableRowDataForACS[] = await equipmentTable.getActualEquipmentTableDataForACS();
        expect(actualData).toEqual(expectedDataForEquipmentACS)
    });

test("Verify test data for AGV",
    {
        tag: [Terminal.CTB, TestCategory.SMOKE, TestCategory.REGRESSION]
    }, async ({homePage, equipmentTable}) => {
        await setExportEquipmentLabels(Severity.TRIVIAL, TestCategory.REGRESSION, [{name: "suite", value: "Import equipment"}]);

        await homePage.selectVehicleType(VehicleType.AGV);
        const actualData = await equipmentTable.getActualEquipmentTableDataForAGV();
        expect(actualData).toEqual(ctbExpectedDataForEquipmentAGV)

    })

test("Verify test data for QC",
    {
        tag: [Terminal.CTB, TestCategory.SMOKE, TestCategory.REGRESSION]
    }, async ({homePage, equipmentTable}) => {
        await setExportEquipmentLabels(Severity.TRIVIAL, TestCategory.REGRESSION, [{name: "suite", value: "Import equipment"}]);

        await homePage.selectVehicleType(VehicleType.QC);
        const actualData = await equipmentTable.getActualEquipmentTableDataForQC();
        expect(actualData).toEqual(ctbExpectedDataForQc)
    });

test("Verify test data for Reach-stacker",
    {
        tag: [Terminal.HCT, TestCategory.SMOKE, TestCategory.REGRESSION]
    }, async ({homePage, equipmentTable}) => {
        await setExportEquipmentLabels(Severity.TRIVIAL, TestCategory.REGRESSION, [{name: "suite", value: "Import equipment"}]);

        await homePage.selectVehicleType(VehicleType.REACH_STACKER);
        const actualData = await equipmentTable.getActualEquipmentTableDataForReachStacker();
        expect(actualData).toEqual(expectedDataForReachStacker)
    })

//@TODO: Possible bug in new EquipmentManager. Check if type field is set to Remote Operating station in datatable.
// Or just run this test in the new equipment manager
test("Verify test data for Remote operating Station",
    {
        tag: [Terminal.HCT, TestCategory.SMOKE, TestCategory.REGRESSION]
    }, async ({homePage, equipmentTable}) => {
        await setExportEquipmentLabels(Severity.TRIVIAL, TestCategory.REGRESSION, [{name: "suite", value: "Import equipment"}]);

        await homePage.selectVehicleType(VehicleType.REMOTE_OPERATING_STATION);
        const actualData = await equipmentTable.getActualEquipmentTableDataForRemoteOperatingStation();
        expect(actualData).toEqual(expectedDataForRemoteOperatingStation)
    })