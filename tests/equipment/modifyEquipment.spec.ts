import {test} from "../../fixtures/tests.fixtures";
import {VehicleType} from "../../enums/vehicleType";
import {expect} from "../../fixtures/tests.fixtures";
import {ctbExpectedDataForQc} from "../../test-data/equipment/ctb/ctbExpectedDataForQc";
import {DURATION} from "../../config/DURATION";
import {ctbValidateEditedQC} from "../../test-data/equipment/ctb/edited/ctbValidateEditedQc";
import {ctbValidateCreatedQC} from "../../test-data/equipment/ctb/ctbValidateCreatedQc";
import {ctbValidateEditedAGV} from "../../test-data/equipment/ctb/edited/ctbValidateEditedAGV";
import {ctbExpectedDataForEquipmentAGV} from "../../test-data/equipment/ctb/ctbAGVEquipment";
import {Tag} from "../../enums/tag";
import {ctbValidateCreatedAGV} from "../../test-data/equipment/ctb/ctbValidateCreatedAGV";
import {ctbExpectedDataForAcs} from "../../test-data/equipment/ctb/expect/ctbAcsEquipment";
import {ctbValidateCreatedACS} from "../../test-data/equipment/ctb/created/ctbValidateCreatedAcs";
import {ctbValidateEditedACS} from "../../test-data/equipment/ctb/edited/ctbValidateEditedAcs";
import {ctbExpectedDataForAcsPage2} from "../../test-data/equipment/ctb/expect/ctbAcsEquipmentPage2";
import {setExportEquipmentLabels} from "../../helpers/setExportedAllureLabels";
import {Severity} from "../../enums/Severity";

test.use({ignoreHTTPSErrors: true});


test("Create, edit and delete a QC equipment (only essential fields)",
    {tag: [Tag.CTB, Tag.SMOKE, Tag.REGRESSION]},
    async ({homePage, equipmentTable,confirmDeleteEquipmentFormPage,editQCFormPage,addQCFormPage}) => {
        await setExportEquipmentLabels(Severity.CRITICAL, Tag.SMOKE, [{name: "suite", value: "CRUD equipment"}]);


        await homePage.selectVehicleType(VehicleType.QC);
        const actualData = await equipmentTable.getActualEquipmentTableDataForQC();
        expect(actualData).toEqual(ctbExpectedDataForQc);

        await addQCFormPage.createQC(
            "Test QC", 203, 3, "TestLane", 50, "Low", "Center", "High",
            45, "V2", "test", "www.koneCranes.com");
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForQC();
        }, {timeout: DURATION.MEDIUM}).toEqual(ctbValidateCreatedQC);

        await equipmentTable.openEditEquipmentMenu("Test QC");
        await editQCFormPage.editQC(
            "Edited QC", 1000, 6, "LaneEdited", 50, "EditedLow", "EditedCenter", "High",
            90, "V2-edited", "edited-test", "www.editKoneCranes.com");
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForQC();
        }, {timeout: DURATION.MEDIUM}).toEqual(ctbValidateEditedQC);

        await editQCFormPage.closeEditForm();
        await equipmentTable.deleteEquipment("Edited QC");
        await confirmDeleteEquipmentFormPage.confirmDeleteEquipment();

        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForQC();
        }, {timeout: DURATION.MEDIUM}).toEqual(ctbExpectedDataForQc);
    }
)

// @TODO BUG IN NEW EQUIPMENT MANAGER:  CS and EST are variables.
//     -     "chassisSpecification": "Without trailer rack",
//     -     "energySourceType": "Battery",
//     +     "chassisSpecification": "app.constants.chassisTypeOptions.",
//     +     "energySourceType": "app.constants.energySourceTypes.",
test("Create, edit and delete an AGV equipment (only essential fields",
    {tag: [Tag.CTB, Tag.SMOKE, Tag.REGRESSION]},
    async ({homePage,equipmentTable,confirmDeleteEquipmentFormPage,addAgvFormPage,editAgvFormPage}) => {
        await setExportEquipmentLabels(Severity.CRITICAL, Tag.SMOKE, [{name: "suite", value: "CRUD equipment"}]);

        await homePage.selectVehicleType(VehicleType.AGV);
        const actualData = await equipmentTable.getActualEquipmentTableDataForAGV();
        expect(actualData).toEqual(ctbExpectedDataForEquipmentAGV);

        await addAgvFormPage.createAGV("Test AGV", 203, "v2", "Creative", 10, 96000);
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForAGV();
        }, {timeout: DURATION.EXTREMELY_LONG}).toEqual(ctbValidateCreatedAGV,);

        await equipmentTable.openEditEquipmentMenu("Test AGV");
        await editAgvFormPage.editAGV("Edited AGV", 600, "edited v2.1", "Edited", 30, 600);

        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForAGV();
        }, {timeout: DURATION.EXTREMELY_LONG}).toEqual(ctbValidateEditedAGV);

        await editAgvFormPage.closeEditForm();
        await equipmentTable.deleteEquipment("Edited AGV");
        await confirmDeleteEquipmentFormPage.confirmDeleteEquipment();
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForQC();
        }, {timeout: DURATION.EXTREMELY_LONG}).toEqual(ctbExpectedDataForQc);
    })

test("Create, edit and delete an ACS equipment (only essential fields",
    {
        tag: [Tag.CTB, Tag.SMOKE, Tag.REGRESSION]
    },
    async ({homePage, equipmentTable, confirmDeleteEquipmentFormPage, addAcsFormPage, editAcsFormPage}) => {
        await setExportEquipmentLabels(Severity.CRITICAL, Tag.SMOKE, [{name: "suite", value: "CRUD equipment"}]);

        await homePage.selectVehicleType(VehicleType.ACS);
        const actualData = await equipmentTable.getActualEquipmentTableDataForACS();
        expect(actualData).toEqual(ctbExpectedDataForAcs);

        await addAcsFormPage.createACS(
            "Test ACS", "new", 60, 80, 2000,
            5, 99990, "test location", 5, 1,
            40000, 7, 43);

        await equipmentTable.navigateToTablePage(2);
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForACS();
        }, {timeout: DURATION.MEDIUM}).toEqual(ctbValidateCreatedACS);

        await equipmentTable.openEditEquipmentMenu("Test ACS");
        await editAcsFormPage.editACS("Edited ACS", "Edited", 30, 30, 30, 600,
            30, "Edited test", 30, 30, 30, 30, 30);

        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForACS();
        }, {timeout: DURATION.MEDIUM}).toEqual(ctbValidateEditedACS);

        await editAcsFormPage.closeEditForm();

        await equipmentTable.deleteEquipment("Edited ACS");
        await confirmDeleteEquipmentFormPage.confirmDeleteEquipment();
        await expect.poll(async () => {
            return await equipmentTable.getActualEquipmentTableDataForACS();
        }, {timeout: DURATION.MEDIUM}).toEqual(ctbExpectedDataForAcsPage2);
    })
