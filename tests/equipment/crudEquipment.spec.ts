import {expect, test} from "../../fixtures/tests.fixtures";
import {VehicleType} from "../../enums/vehicleType";
import {ctbExpectedDataForEquipmentAGV} from "../../test-data/equipment/ctb/ctbAGVEquipment";
import {ctbValidateCreatedAGV} from "../../test-data/equipment/ctb/created/ctbValidateCreatedAGV";
import {Duration} from "../../config/Duration";
import {ctbValidateCreatedQC} from "../../test-data/equipment/ctb/created/ctbValidateCreatedQc";
import {ctbExpectedDataForQc} from "../../test-data/equipment/ctb/expect/ctbExpectedDataForQc";
import {ctbExpectedDataForAcs} from "../../test-data/equipment/ctb/expect/ctbAcsEquipment";
import {ctbExpectedDataForAcsAfterImport} from "../../test-data/equipment/ctb/ctbAcsEquipmentWithImportedData";

import {expectedDataForEquipmentACS} from "../../test-data/equipment/hct/equipmentTestDataForACS";
import {htcValidateCreatedARMG} from "../../test-data/equipment/hct/created/htcValidateCreatedARMG"
import {htcExpectedDataForEquipmentARMG} from "../../test-data/equipment/hct/htcEquipmentTestDataForARMG";
import {TestCategory} from "../../enums/TestCategory";
import {setExportEquipmentLabels} from "../../helpers/setExportedAllureLabels";
import {Severity} from "../../enums/Severity";
import {
    expectedDataForRemoteOperatingStation
} from "../../test-data/equipment/hct/equipmentTestDataForRemoteOperatingStation";
import {ctbExpectedDataForAcsPage2} from "../../test-data/equipment/ctb/expect/ctbAcsEquipmentPage2";
import {ctbValidateCreatedACS} from "../../test-data/equipment/ctb/created/ctbValidateCreatedAcs";
import {Terminal} from "../../enums/Terminal";
import {expectedDataForMSC} from "../../test-data/equipment/hct/equipmentTestDataForMSC";
import {htcValidateCreatedMSC} from "../../test-data/equipment/hct/created/htcValidateCreatedMSC";
import {expectedDataForTerminalTruck} from "../../test-data/equipment/hct/equipmentTestDataForTerminalTruck";
import {htcValidateCreatedTerminalTruck} from "../../test-data/equipment/hct/created/htcValidateCreatedTerminalTruck";
import {
    htcValidateCreatedRemoteOperatingStation
} from "../../test-data/equipment/hct/created/htcValidateCreatedRemoteOperatingStation";

test.use({ignoreHTTPSErrors: true});

test("Create and delete a A-RMG (only essential fields)",
    {
        tag: [Terminal.HCT, TestCategory.SMOKE, TestCategory.REGRESSION]
    },
    async ({homePage, addArmgFormPage, equipmentTable, confirmDeleteEquipmentFormPage}) => {
        await setExportEquipmentLabels(Severity.CRITICAL, TestCategory.SMOKE, [{name: "suite", value: "CRUD equipment"}]);

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
        tag: [Terminal.HCT, TestCategory.SMOKE, TestCategory.REGRESSION]
    },
    async ({homePage, addArmgFormPage, equipmentTable, confirmDeleteEquipmentFormPage, editArmgFormPage}) => {
        await setExportEquipmentLabels(Severity.CRITICAL, TestCategory.SMOKE, [{name: "suite", value: "CRUD equipment"}]);

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
        tag: [Terminal.CTB, TestCategory.SMOKE, TestCategory.REGRESSION]
    },
    async ({homePage, equipmentTable, confirmDeleteEquipmentFormPage, addAgvFormPage}) => {
        await setExportEquipmentLabels(Severity.CRITICAL, TestCategory.SMOKE, [{name: "suite", value: "CRUD equipment"}]);

        await homePage.selectVehicleType(VehicleType.AGV);
        const actualData = await equipmentTable.getActualEquipmentTableDataForAGV();

        expect(actualData).toEqual(ctbExpectedDataForEquipmentAGV)

        await addAgvFormPage.createAGV("Test AGV", 203, "v2", "Creative", 10, 96000);
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForAGV();
        }, {timeout: Duration.LONG}).toEqual(ctbValidateCreatedAGV);

        await equipmentTable.deleteEquipment("Test AGV");
        await confirmDeleteEquipmentFormPage.confirmDeleteEquipment();
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForAGV();
        }, {timeout: Duration.LONG}).toEqual(ctbExpectedDataForEquipmentAGV);
    }
)


test("Create and delete QC equipment (only essential fields)",
    {
        tag: [Terminal.HCT, TestCategory.SMOKE, TestCategory.REGRESSION]
    },
    async ({homePage, equipmentTable, confirmDeleteEquipmentFormPage, addQCFormPage}) => {
        await setExportEquipmentLabels(Severity.CRITICAL, TestCategory.SMOKE, [{name: "suite", value: "CRUD equipment"}]);

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
        tag: [Terminal.CTB, TestCategory.SMOKE, TestCategory.REGRESSION]
    }, async ({homePage, equipmentTable, confirmDeleteEquipmentFormPage, addAcsFormPage}) => {
        await setExportEquipmentLabels(Severity.CRITICAL, TestCategory.SMOKE, [{name: "suite", value: "CRUD equipment"}]);

        await homePage.selectVehicleType(VehicleType.ACS);
        await equipmentTable.navigateToTablePage(2)
        const actualData = await equipmentTable.getActualEquipmentTableDataForACS();
        expect(actualData).toEqual(ctbExpectedDataForAcsPage2);

        await addAcsFormPage.createACS(
            "Test ACS", "new", 60, 80, 2000,
            5, 99990, "test location", 5, 1,
            40000, 7, 43);
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForACS();
        }, {timeout: Duration.VERY_LONG}).toEqual(ctbValidateCreatedACS);

        await equipmentTable.deleteEquipment("Test ACS");
        await confirmDeleteEquipmentFormPage.confirmDeleteEquipment();
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForACS();
        }, {timeout: Duration.MEDIUM}).toEqual(ctbExpectedDataForAcsPage2);
    });

// @TODO: finish validation for creation of MSC
test("Create a MSC (only essential fields)",
    {
        tag: [Terminal.HCT, TestCategory.SMOKE, TestCategory.REGRESSION]
    }, async ({homePage, addMscFormPage, equipmentTable,confirmDeleteEquipmentFormPage}) => {
        await setExportEquipmentLabels(Severity.CRITICAL, TestCategory.SMOKE, [{name: "suite", value: "CRUD equipment"}]);

        await homePage.selectVehicleType(VehicleType.MSC);
        const actualData = await equipmentTable.getActualEquipmentTableDataForMSC();
        expect(actualData).toEqual(expectedDataForMSC)

        await addMscFormPage.createMSC(
            'Test A-RMG', 300, 200, '3000', "1.4", 200);

        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForMSC();
        }, {timeout: Duration.VERY_LONG}).toEqual(htcValidateCreatedMSC);

        // await equipmentTable.deleteEquipment("Test A-RMG");
        // await confirmDeleteEquipmentFormPage.confirmDeleteEquipment();
        // await expect.poll(async () => {
        //     return await equipmentTable.getActualEquipmentTableDataForMSC();
        // }, {timeout: Duration.VERY_LONG}).toEqual(expectedDataForMSC);
    });

// @TODO: finish validation for creation of REACH STACKER
test("Create a REACH STACKER (only essential fields)",
    {
        tag: [Terminal.HCT, TestCategory.SMOKE, TestCategory.REGRESSION]
    }, async ({homePage, addReachStackerFormPage, equipmentTable}) => {
        await setExportEquipmentLabels(Severity.NORMAL, TestCategory.SMOKE, [{name: "suite", value: "CRUD equipment"}]);

        await homePage.selectVehicleType(VehicleType.REACH_STACKER);
        const actualData = await equipmentTable.getActualEquipmentTableDataForReachStacker();
        // expect(actualData).toEqual(expectedDataForEquipmentACS)

        await addReachStackerFormPage.createReachStacker(
            "Test Reach Stacker", 4000, 2000, "v2",
            30, 50, 180,);
    });

// @TODO: this test fails because of bug: TSG-8955 - REMOTE OPERATING WORK STATION
test("Create a remote operating station (only essential fields)",
    {
        tag: [Terminal.HCT, TestCategory.REGRESSION]
    }, async ({homePage, addRemoteOperatingStationFormPage, equipmentTable, confirmDeleteEquipmentFormPage}) => {
        await setExportEquipmentLabels(Severity.NORMAL, TestCategory.SMOKE, [{name: "suite", value: "CRUD equipment"}]);

        await homePage.selectVehicleType(VehicleType.REMOTE_OPERATING_STATION);
        const actualData = await equipmentTable.getActualEquipmentTableDataForRemoteOperatingStation();
        expect(actualData).toEqual(expectedDataForRemoteOperatingStation)

        await addRemoteOperatingStationFormPage.createRemoteOperatingStation(
            "Test", 5);

        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForRemoteOperatingStation();
        }, {timeout: Duration.SHORT}).toEqual(htcValidateCreatedRemoteOperatingStation);

        await equipmentTable.deleteEquipment("Test");
        await confirmDeleteEquipmentFormPage.confirmDeleteEquipment();
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForRemoteOperatingStation();
        }, {timeout: Duration.MEDIUM}).toEqual(expectedDataForRemoteOperatingStation);
});

test("Create a TERMINAL TRUCK (only essential fields)",
    {
        tag: [Terminal.HCT, TestCategory.SMOKE, TestCategory.REGRESSION]
    }, async ({homePage, equipmentTable, addTerminalTruckFormPage, confirmDeleteEquipmentFormPage}) => {
        await setExportEquipmentLabels(Severity.NORMAL, TestCategory.SMOKE, [{name: "suite", value: "CRUD equipment"}]);

        await homePage.selectVehicleType(VehicleType.TERMINAL_TRUCK);
        const actualData = await equipmentTable.getActualEquipmentTableDataForTerminalTruck();
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForTerminalTruck();
        }, {timeout: Duration.MEDIUM}).toEqual(actualData);

        await addTerminalTruckFormPage.createTerminalTruck
        ("Test Terminal Truck", 2000, "V2",
            300, 50, 5);

        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForTerminalTruck();
        }, {timeout: Duration.VERY_LONG}).toEqual(htcValidateCreatedTerminalTruck);

        await equipmentTable.deleteEquipment("Test Terminal Truck");
        await confirmDeleteEquipmentFormPage.confirmDeleteEquipment();
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForTerminalTruck();
        }, {timeout: Duration.MEDIUM}).toEqual(expectedDataForTerminalTruck);
    });

// @TODO: finish validation for creation of A-RTG
test("Create and delete A-RTG (only essential fields)",
    {
        tag: [Terminal.CTB, TestCategory.REGRESSION]
    }, async ({homePage, addArtgFormPage, equipmentTable}) => {
        await setExportEquipmentLabels(Severity.NORMAL, TestCategory.REGRESSION, [{name: "suite", value: "CRUD equipment"}]);

        await homePage.selectVehicleType(VehicleType.A_RTG);
        const actualData = await equipmentTable.getActualEquipmentTableDataForARTG();
        // expect(actualData).toEqual(expectedDataForEquipmentACS)
        await addArtgFormPage.createARTG(
            'Test A-RTG', 300, 2, 500, "v2", "LOCAL", 300, 5);
    });

// @TODO: finish validation for creation of BES
test("Create a BES (only essential fields)",
    {
        tag: [Terminal.HCT, TestCategory.REGRESSION]
    }, async ({homePage, equipmentTable, addBesFormPage}) => {
        await setExportEquipmentLabels(Severity.NORMAL, TestCategory.REGRESSION, [{name: "suite", value: "CRUD equipment"}]);

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
        tag: [Terminal.HCT, TestCategory.REGRESSION]
    }, async ({homePage, equipmentTable, addAstradFormPage}) => {
        await setExportEquipmentLabels(Severity.NORMAL, TestCategory.REGRESSION, [{name: "suite", value: "CRUD equipment"}]);

        await homePage.selectVehicleType(VehicleType.A_STRAD);
        const actualData = await equipmentTable.getActualEquipmentTableDataForASTRAD();
        // expect(actualData).toEqual(expectedDataForEquipmentACS)
        await addAstradFormPage.createASTRAD("Test-Astrad", 50, 50, "v-0", "test", 2)
    });

// @TODO: finish validation for creation of AUTO-TT
test("Create a AUTO_TT (only essential fields)",
    {
        tag: [Terminal.HCT, TestCategory.REGRESSION]
    }, async ({homePage, equipmentTable, addAutoTTFormPage}) => {
        await setExportEquipmentLabels(Severity.NORMAL, TestCategory.REGRESSION, [{name: "suite", value: "CRUD equipment"}]);

        await homePage.selectVehicleType(VehicleType.AUTO_TT);
        const actualData = await equipmentTable.getActualEquipmentTableDataForAUTOTT();
        // expect(actualData).toEqual(expectedDataForEquipmentACS)
        await addAutoTTFormPage.createAutoTT("Test AUTO TT", 50, "test-provider", "www.test.nl");
    });

// @TODO: finish validation for creation of RAIL GANTRY CRANE
test("Create a Rail Gantry Crane (only essential fields)",
    {
        tag: [Terminal.HCT, TestCategory.REGRESSION]
    }, async ({homePage, equipmentTable, addRailGantryCraneFormPage}) => {
        await setExportEquipmentLabels(Severity.NORMAL, TestCategory.REGRESSION, [{name: "suite", value: "CRUD equipment"}]);
        await homePage.selectVehicleType(VehicleType.RAIL_GANTRY_CRANE);
        const actualData = await equipmentTable.getActualEquipmentTableDataForRailGantryCrane();
        // expect(actualData).toEqual(expectedDataForEquipmentACS)
        await addRailGantryCraneFormPage.createRailGantryCrane("Test Rail Gantry Crane", 50, 50, 30, "test", "new crane",11)
 });