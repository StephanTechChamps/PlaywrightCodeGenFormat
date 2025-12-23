import {expect, test} from '../../fixtures/tests.fixtures'
import {VehicleType} from "../../enums/vehicleType";
import {ctbExpectedDataForEquipmentAGV} from "../../test-data/equipment/ctb/ctbAGVEquipment";
import {ctbValidateCreatedAGV} from "../../test-data/equipment/ctb/ctbValidateCreatedAGV";
import {DURATION} from "../../config/DURATION";
import {ctbValidateCreatedQC} from "../../test-data/equipment/ctb/ctbValidateCreatedQc";
import {ctbExpectedDataForQc} from "../../test-data/equipment/ctb/ctbExpectedDataForQc";
import {ctbExpectedDataForAcs} from "../../test-data/equipment/ctb/expect/ctbAcsEquipment";
import {ctbExpectedDataForAcsAfterImport} from "../../test-data/equipment/ctb/ctbAcsEquipmentWithImportedData";

import {expectedDataForEquipmentACS} from "../../test-data/equipment/htc/equipmentTestDataForACS";
import {htcValidateCreatedARMG} from "../../test-data/equipment/htc/htcValidateCreatedARMG"
import {htcExpectedDataForEquipmentARMG} from "../../test-data/equipment/htc/htcEquipmentTestDataForARMG";
import {Tag} from "../../enums/tag";
import {setExportEquipmentLabels} from "../../helpers/setExportedAllureLabels";
import {Severity} from "../../enums/Severity";

test.use({ignoreHTTPSErrors: true});

test("Create and delete a A-RMG (only essential fields)",
    {
        tag: [Tag.HTC, Tag.SMOKE, Tag.REGRESSION]
    },
    async ({homePage, addArmgFormPage, equipmentTable, confirmDeleteEquipmentFormPage}) => {
        await setExportEquipmentLabels(Severity.CRITICAL, Tag.SMOKE, [{name: "suite", value: "CRUD equipment"}]);

        await homePage.selectVehicleType(VehicleType.A_RMG);
        const actualData = await equipmentTable.getActualEquipmentTableDataForARMG();
        expect(actualData).toEqual(htcExpectedDataForEquipmentARMG)

        await addArmgFormPage.createARMG(
            'Test A-RMG', 300, 200, 3000, "1.4", 'newHost', 20);
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForARMG();
        }, {timeout: DURATION.SHORT}).toEqual(htcValidateCreatedARMG);

        await equipmentTable.deleteEquipment("Test A-RMG");
        await confirmDeleteEquipmentFormPage.confirmDeleteEquipment();
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForAGV();
        }, {timeout: DURATION.LONG}).toEqual(htcExpectedDataForEquipmentARMG);

    });

// @TODO: alter the edit step of the test
test("Create and edit a A-RMG (only essential fields)",
    {
        tag: [Tag.HTC, Tag.SMOKE, Tag.REGRESSION]
    },
    async ({homePage, addArmgFormPage, equipmentTable, confirmDeleteEquipmentFormPage, editArmgFormPage}) => {
        await setExportEquipmentLabels(Severity.CRITICAL, Tag.SMOKE, [{name: "suite", value: "CRUD equipment"}]);

        await homePage.selectVehicleType(VehicleType.A_RMG);
        const actualData = await equipmentTable.getActualEquipmentTableDataForARMG();
        expect(actualData).toEqual(htcExpectedDataForEquipmentARMG)

        await addArmgFormPage.createARMG(
            'Test A-RMG', 300, 200, 3000, "1.4", 'newHost', 20);
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForARMG();
        }, {timeout: DURATION.LONG}).toEqual(htcValidateCreatedARMG);

        await equipmentTable.openEditEquipmentMenu('Test A-RMG');
        await editArmgFormPage.editEquipment({
            name: "Test Adjusted",
            craneId: "3",
        })
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForARMG();
        }, {timeout: DURATION.SHORT}).toEqual(htcValidateCreatedARMG);

        await equipmentTable.deleteEquipment("Test A-RMG");
        await confirmDeleteEquipmentFormPage.confirmDeleteEquipment();
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForAGV();
        }, {timeout: DURATION.LONG}).toEqual(htcExpectedDataForEquipmentARMG);

    });

test("Create and delete AGV equipment (only essential fields)",
    {
        tag: [Tag.CTB, Tag.SMOKE, Tag.REGRESSION]
    },
    async ({homePage, equipmentTable, confirmDeleteEquipmentFormPage, addAgvFormPage}) => {
        await setExportEquipmentLabels(Severity.CRITICAL, Tag.SMOKE, [{name: "suite", value: "CRUD equipment"}]);

        await homePage.selectVehicleType(VehicleType.AGV);
        const actualData = await equipmentTable.getActualEquipmentTableDataForAGV();

        expect(actualData).toEqual(ctbExpectedDataForEquipmentAGV)

        await addAgvFormPage.createAGV("Test AGV", 203, "v2", "Creative", 10, 96000);
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForAGV();
        }, {timeout: DURATION.SHORT}).toEqual(ctbValidateCreatedAGV);

        await equipmentTable.deleteEquipment("Test AGV");
        await confirmDeleteEquipmentFormPage.confirmDeleteEquipment();
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForAGV();
        }, {timeout: DURATION.LONG}).toEqual(ctbExpectedDataForEquipmentAGV);
    }
)


test("Create and delete QC equipment (only essential fields)",
    {
        tag: [Tag.HTC, Tag.SMOKE, Tag.REGRESSION]
    },
    async ({homePage, equipmentTable, confirmDeleteEquipmentFormPage, addQCFormPage}) => {
        await setExportEquipmentLabels(Severity.CRITICAL, Tag.SMOKE, [{name: "suite", value: "CRUD equipment"}]);

        await homePage.selectVehicleType(VehicleType.QC);
        const actualData = await equipmentTable.getActualEquipmentTableDataForQC();
        expect(actualData).toEqual(ctbExpectedDataForQc);

        await addQCFormPage.createQC(
            "Test QC", 203, 3, "TestLane", 50, "Low", "Center", "High",
            45, "V2", "test", "www.koneCranes.com");
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForQC();
        }, {timeout: DURATION.SHORT}).toEqual(ctbValidateCreatedQC);

        await equipmentTable.deleteEquipment("Test QC");
        await confirmDeleteEquipmentFormPage.confirmDeleteEquipment();
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForQC();
        }, {timeout: DURATION.MEDIUM}).toEqual(ctbExpectedDataForQc);
    }
)


test("Create and delete ACS equipment (only essential fields)",
    {
        tag: [Tag.CTB, Tag.SMOKE, Tag.REGRESSION]
    }, async ({homePage, equipmentTable, confirmDeleteEquipmentFormPage, addAcsFormPage}) => {
        await setExportEquipmentLabels(Severity.CRITICAL, Tag.SMOKE, [{name: "suite", value: "CRUD equipment"}]);

        await homePage.selectVehicleType(VehicleType.ACS);
        await equipmentTable.navigateToTablePage(2)
        const actualData = await equipmentTable.getActualEquipmentTableDataForACS();
        expect(actualData).toEqual(ctbExpectedDataForAcs);

        await addAcsFormPage.createACS(
            "Test ACS", "new", 60, 80, 2000,
            5, 99990, "test location", 5, 1,
            40000, 7, 43);
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForACS();
        }, {timeout: DURATION.MEDIUM}).toEqual(ctbExpectedDataForAcsAfterImport);

        await equipmentTable.deleteEquipment("Test ACS");
        await confirmDeleteEquipmentFormPage.confirmDeleteEquipment();
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForACS();
        }, {timeout: DURATION.MEDIUM}).toEqual(ctbExpectedDataForAcs);
    });

// @TODO: finish validation for creation of MSC
test("Create a MSC (only essential fields)",
    {
        tag: [Tag.HTC, Tag.SMOKE, Tag.REGRESSION]
    }, async ({homePage, addMscFormPage, equipmentTable}) => {
        await setExportEquipmentLabels(Severity.CRITICAL, Tag.SMOKE, [{name: "suite", value: "CRUD equipment"}]);

        await homePage.selectVehicleType(VehicleType.MSC);
        const actualData = await equipmentTable.getActualEquipmentTableDataForMSC();
        expect(actualData).toEqual(expectedDataForEquipmentACS)

        await addMscFormPage.createMSC(
            'Test A-RMG', 300, 200, '3000', "1.4", 200);
    });

// @TODO: finish validation for creation of REACH STACKER
test("Create a REACH STACKER (only essential fields)",
    {
        tag: [Tag.HTC, Tag.SMOKE, Tag.REGRESSION]
    }, async ({homePage, addMscFormPage, equipmentTable}) => {
        await setExportEquipmentLabels(Severity.NORMAL, Tag.SMOKE, [{name: "suite", value: "CRUD equipment"}]);

        await homePage.selectVehicleType(VehicleType.REACH_STACKER);
        const actualData = await equipmentTable.getActualEquipmentTableDataForReachStacker();
        expect(actualData).toEqual(expectedDataForEquipmentACS)

        await addMscFormPage.createMSC(
            'Test A-RMG', 300, 200, "d", "1.4", 5);
    });

// @TODO: finish validation for creation of REMOTE OPERATING WORK STATION
test("Create a remote operating station (only essential fields)",
    {
        tag: [Tag.HTC, Tag.SMOKE, Tag.REGRESSION]
    }, async ({homePage, addMscFormPage, equipmentTable}) => {
        await setExportEquipmentLabels(Severity.NORMAL, Tag.SMOKE, [{name: "suite", value: "CRUD equipment"}]);

        await homePage.selectVehicleType(VehicleType.REMOTE_OPERATING_STATION);
        const actualData = await equipmentTable.getActualEquipmentTableDataForRemoteOperatingStation();
        expect(actualData).toEqual(expectedDataForEquipmentACS)

        await addMscFormPage.createMSC(
            'Test A-RMG', 300, 200, "v2", "1.4", 1);
    });

// @TODO: finish validation for creation of TERMINAL TRUCK
test("Create a Terminal truck (only essential fields)",
    {
        tag: [Tag.HTC, Tag.SMOKE, Tag.REGRESSION]
    }, async ({homePage, addMscFormPage, equipmentTable}) => {
        await setExportEquipmentLabels(Severity.NORMAL, Tag.SMOKE, [{name: "suite", value: "CRUD equipment"}]);

        await homePage.selectVehicleType(VehicleType.TERMINAL_TRUCK);
        const actualData = await equipmentTable.getActualEquipmentTableDataForReachStacker();
        expect(actualData).toEqual(expectedDataForEquipmentACS)
        await addMscFormPage.createMSC(
            'Test A-RMG', 300, 200, "v2", "1.4", 5);
    });

// expect(actualData).toEqual(ctbQcEquipmen
// await equipmentFormPage.createASTRAD("Test A-STRAD", 4000, 600, "1.20202", "Lion-o", 600);

// test("Create an A-RTG (only essential fields)", async ({page}) => {
//     const {homePage, equipmentFormPage} = setupPages(page);
//
//     await homePage.selectVehicleType(VehicleType.A_RTG);
//     await equipmentFormPage.createARTG("Test A-RTG", 10, 30, 600, "d-10", "new", 45);
// })

// test("Create a MSC (only essential fields)", async ({page}) => {
//     const {homePage, equipmentFormPage} = setupPages(page);
//
//     await homePage.selectVehicleType(VehicleType.MSC);
//     await equipmentFormPage.createMSC("Test MSC", 45, 600, "fix", "Cheetah", 808);
// })