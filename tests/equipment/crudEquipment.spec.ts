import {expect, test} from "../../fixtures/tests.fixtures";
import {VehicleType} from "../../enums/vehicleType";
import {ctbExpectedDataForEquipmentAGV} from "../../test-data/equipment/ctb/ctbAGVEquipment";
import {ctbValidateCreatedAGV} from "../../test-data/equipment/ctb/ctbValidateCreatedAGV";
import {Duration} from "../../config/Duration";
import {ctbValidateCreatedQC} from "../../test-data/equipment/ctb/ctbValidateCreatedQc";
import {ctbExpectedDataForQc} from "../../test-data/equipment/ctb/ctbExpectedDataForQc";
import {ctbExpectedDataForAcs} from "../../test-data/equipment/ctb/expect/ctbAcsEquipment";
import {ctbExpectedDataForAcsAfterImport} from "../../test-data/equipment/ctb/ctbAcsEquipmentWithImportedData";

import {expectedDataForEquipmentACS} from "../../test-data/equipment/hct/equipmentTestDataForACS";
import {htcValidateCreatedARMG} from "../../test-data/equipment/hct/htcValidateCreatedARMG"
import {htcExpectedDataForEquipmentARMG} from "../../test-data/equipment/hct/htcEquipmentTestDataForARMG";
import {Tag} from "../../enums/Tag";
import {setExportEquipmentLabels} from "../../helpers/setExportedAllureLabels";
import {Severity} from "../../enums/Severity";
import {
    expectedDataForRemoteOperatingStation
} from "../../test-data/equipment/hct/equipmentTestDataForRemoteOperatingStation";

test.use({ignoreHTTPSErrors: true});

test("Create and delete a A-RMG (only essential fields)",
    {
        tag: [Tag.HCT, Tag.SMOKE, Tag.REGRESSION]
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
        }, {timeout: Duration.SHORT}).toEqual(htcValidateCreatedARMG);

        await equipmentTable.deleteEquipment("Test A-RMG");
        await confirmDeleteEquipmentFormPage.confirmDeleteEquipment();
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForARMG();
        }, {timeout: Duration.LONG}).toEqual(htcExpectedDataForEquipmentARMG);

    });

// @TODO: alter the edit step of the test
test("Create and edit a A-RMG (only essential fields)",
    {
        tag: [Tag.HCT, Tag.SMOKE, Tag.REGRESSION]
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
        }, {timeout: Duration.LONG}).toEqual(htcValidateCreatedARMG);

        await equipmentTable.openEditEquipmentMenu('Test A-RMG');
        await editArmgFormPage.editEquipment({
            name: "Test Adjusted",
            craneId: "3",
        })
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForARMG();
        }, {timeout: Duration.SHORT}).toEqual(htcValidateCreatedARMG);

        await equipmentTable.deleteEquipment("Test A-RMG");
        await confirmDeleteEquipmentFormPage.confirmDeleteEquipment();
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForAGV();
        }, {timeout: Duration.LONG}).toEqual(htcExpectedDataForEquipmentARMG);

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
        }, {timeout: Duration.SHORT}).toEqual(ctbValidateCreatedAGV);

        await equipmentTable.deleteEquipment("Test AGV");
        await confirmDeleteEquipmentFormPage.confirmDeleteEquipment();
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForAGV();
        }, {timeout: Duration.LONG}).toEqual(ctbExpectedDataForEquipmentAGV);
    }
)


test("Create and delete QC equipment (only essential fields)",
    {
        tag: [Tag.HCT, Tag.SMOKE, Tag.REGRESSION]
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
        }, {timeout: Duration.SHORT}).toEqual(ctbValidateCreatedQC);

        await equipmentTable.deleteEquipment("Test QC");
        await confirmDeleteEquipmentFormPage.confirmDeleteEquipment();
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForQC();
        }, {timeout: Duration.MEDIUM}).toEqual(ctbExpectedDataForQc);
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
        }, {timeout: Duration.MEDIUM}).toEqual(ctbExpectedDataForAcsAfterImport);

        await equipmentTable.deleteEquipment("Test ACS");
        await confirmDeleteEquipmentFormPage.confirmDeleteEquipment();
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForACS();
        }, {timeout: Duration.MEDIUM}).toEqual(ctbExpectedDataForAcs);
    });

// @TODO: finish validation for creation of MSC
test("Create a MSC (only essential fields)",
    {
        tag: [Tag.HCT, Tag.SMOKE, Tag.REGRESSION]
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
        tag: [Tag.HCT, Tag.SMOKE, Tag.REGRESSION]
    }, async ({homePage, addReachStackerFormPage, equipmentTable}) => {
        await setExportEquipmentLabels(Severity.NORMAL, Tag.SMOKE, [{name: "suite", value: "CRUD equipment"}]);

        await homePage.selectVehicleType(VehicleType.REACH_STACKER);
        const actualData = await equipmentTable.getActualEquipmentTableDataForReachStacker();
        // expect(actualData).toEqual(expectedDataForEquipmentACS)

        await addReachStackerFormPage.createReachStacker(
            "Test Reach Stacker", 4000, 2000, "v2",
            30, 50, 180,);
    });

// @TODO: finish validation for creation of REMOTE OPERATING WORK STATION
test("Create a remote operating station (only essential fields)",
    {
        tag: [Tag.HCT, Tag.REGRESSION]
    }, async ({homePage, addRemoteOperatingStationFormPage, equipmentTable}) => {
        await setExportEquipmentLabels(Severity.NORMAL, Tag.SMOKE, [{name: "suite", value: "CRUD equipment"}]);

        await homePage.selectVehicleType(VehicleType.REMOTE_OPERATING_STATION);
        const actualData = await equipmentTable.getActualEquipmentTableDataForRemoteOperatingStation();
        // expect(actualData).toEqual(expectedDataForRemoteOperatingStation)


        await addRemoteOperatingStationFormPage.createRemoteOperatingStation(
            "Test Remote Operating station", 5);
    });

// @TODO: finish validation for creation of TERMINAL TRUCK
test("Create a TERMINAL TRUCK (only essential fields)",
    {
        tag: [Tag.HCT, Tag.SMOKE, Tag.REGRESSION]
    }, async ({homePage, equipmentTable, addTerminalTruckFormPage}) => {
        await setExportEquipmentLabels(Severity.NORMAL, Tag.SMOKE, [{name: "suite", value: "CRUD equipment"}]);

        await homePage.selectVehicleType(VehicleType.TERMINAL_TRUCK);
        const actualData = await equipmentTable.getActualEquipmentTableDataForTerminalTruck();
        // expect(actualData).toEqual(expectedDataForEquipmentACS)
        await addTerminalTruckFormPage.createTerminalTruck
        ("Test Terminal Truck", 2000, "V2",
            300, 50, 5);
    });

// expect(actualData).toEqual(ctbQcEquipmen
// await equipmentFormPage.createASTRAD("Test A-STRAD", 4000, 600, "1.20202", "Lion-o", 600);

// @TODO: finish validation for creation of A-RTG
test("Create and delete A-RTG (only essential fields)",
    {
        tag: [Tag.CTB, Tag.REGRESSION]
    }, async ({homePage, addArtgFormPage, equipmentTable}) => {
        await setExportEquipmentLabels(Severity.NORMAL, Tag.REGRESSION, [{name: "suite", value: "CRUD equipment"}]);

        await homePage.selectVehicleType(VehicleType.A_RTG);
        const actualData = await equipmentTable.getActualEquipmentTableDataForARTG();
        // expect(actualData).toEqual(expectedDataForEquipmentACS)
        await addArtgFormPage.createARTG(
            'Test A-RTG', 300, 2, 500, "v2", "LOCAL", 300, 5);
    });

// @TODO: finish validation for creation of BES
test("Create a BES (only essential fields)",
    {
        tag: [Tag.HCT, Tag.REGRESSION]
    }, async ({homePage, equipmentTable, addBesFormPage}) => {
        await setExportEquipmentLabels(Severity.NORMAL, Tag.REGRESSION, [{name: "suite", value: "CRUD equipment"}]);

        await homePage.selectVehicleType(VehicleType.BES);
        const actualData = await equipmentTable.getActualEquipmentTableDataForBES();
        await addBesFormPage.createBES("Test-BES", 20, 20, 50,
            5, 16, "test", 65, 45,
            5555, 8447, 98)
        // expect(actualData).toEqual(expectedDataForEquipmentACS)
        // await addTerminalTruckFormPage.createTerminalTruck
        // ("Test Terminal Truck", 2000, "V2",
        //     300, 50, 5);
    });


// @TODO: finish validation for creation of A-STRAD
test("Create a A-STRAD (only essential fields)",
    {
        tag: [Tag.HCT, Tag.REGRESSION]
    }, async ({homePage, equipmentTable, addAstradFormPage}) => {
        await setExportEquipmentLabels(Severity.NORMAL, Tag.REGRESSION, [{name: "suite", value: "CRUD equipment"}]);

        await homePage.selectVehicleType(VehicleType.A_STRAD);
        const actualData = await equipmentTable.getActualEquipmentTableDataForASTRAD();
        // expect(actualData).toEqual(expectedDataForEquipmentACS)
        await addAstradFormPage.createASTRAD("Test-Astrad", 50, 50, "v-0", "test", 2)
    });

// @TODO: finish validation for creation of AUTO-TT
test("Create a AUTO_TT (only essential fields)",
    {
        tag: [Tag.HCT, Tag.REGRESSION]
    }, async ({homePage, equipmentTable, addAutoTTFormPage}) => {
        await setExportEquipmentLabels(Severity.NORMAL, Tag.REGRESSION, [{name: "suite", value: "CRUD equipment"}]);

        await homePage.selectVehicleType(VehicleType.AUTO_TT);
        const actualData = await equipmentTable.getActualEquipmentTableDataForAUTOTT();
        // expect(actualData).toEqual(expectedDataForEquipmentACS)
        await addAutoTTFormPage.createAutoTT("Test AUTO TT", 50, "test-provider", "www.test.nl");
    });

// @TODO: finish validation for creation of RAIL GANTRY CRANE
test("Create a Rail Gantry Crane (only essential fields)",
    {
        tag: [Tag.HCT, Tag.REGRESSION]
    }, async ({homePage, equipmentTable, addRailGantryCraneFormPage}) => {
        await setExportEquipmentLabels(Severity.NORMAL, Tag.REGRESSION, [{name: "suite", value: "CRUD equipment"}]);
        await homePage.selectVehicleType(VehicleType.RAIL_GANTRY_CRANE);
        const actualData = await equipmentTable.getActualEquipmentTableDataForRailGantryCrane();
        // expect(actualData).toEqual(expectedDataForEquipmentACS)
        await addRailGantryCraneFormPage.createRailGantryCrane("Test Rail Gantry Crane", 50, 50, 30, "test", "new crane",11)
 });