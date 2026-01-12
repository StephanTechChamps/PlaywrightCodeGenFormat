import {test} from "../../fixtures/tests.fixtures";
import {VehicleType} from "../../enums/vehicleType";
import {setExportEquipmentLabels} from "../../helpers/setExportedAllureLabels";
import {Severity} from "../../enums/Severity";
import {TestCategory} from "../../enums/TestCategory";
import {Terminal} from "../../enums/Terminal";

test.use({ignoreHTTPSErrors: true});


test("Delete equipment-type A-RMG", {
    tag: [Terminal.HCT, TestCategory.REGRESSION]
}, async ({homePage, equipmentTable}) => {
    await setExportEquipmentLabels(Severity.TRIVIAL, TestCategory.REGRESSION, [{name: "suite", value: "CRUD equipment"}]);

    await homePage.selectVehicleType(VehicleType.A_RMG);
    await equipmentTable.deleteEquipment("AL01");
});

test("Delete equipment-type MSC", {
    tag: [Terminal.HCT, TestCategory.REGRESSION]
}, async ({homePage, equipmentTable}) => {
    await setExportEquipmentLabels(Severity.TRIVIAL, TestCategory.REGRESSION, [{name: "suite", value: "CRUD equipment"}]);

    await homePage.selectVehicleType(VehicleType.MSC);
    await equipmentTable.deleteEquipment("SH01");
})

test("Delete equipment-type QC", {
    tag: [Terminal.HCT, TestCategory.REGRESSION]
}, async ({homePage, equipmentTable}) => {
    await setExportEquipmentLabels(Severity.TRIVIAL, TestCategory.REGRESSION, [{name: "suite", value: "CRUD equipment"}]);

    await homePage.selectVehicleType(VehicleType.QC);
    await equipmentTable.deleteEquipment("QC01");
})

test("Delete equipment-type REACH-STACKER", {
    tag: [Terminal.HCT, TestCategory.REGRESSION]
}, async ({homePage, equipmentTable}) => {
    await setExportEquipmentLabels(Severity.TRIVIAL, TestCategory.REGRESSION, [{name: "suite", value: "CRUD equipment"}]);

    await homePage.selectVehicleType(VehicleType.REACH_STACKER);
    await equipmentTable.deleteEquipment("RS01");
})

test("Delete equipment-type Terminal Truck", {
    tag: [Terminal.HCT, TestCategory.REGRESSION]
}, async ({homePage, equipmentTable}) => {
    await setExportEquipmentLabels(Severity.TRIVIAL, TestCategory.REGRESSION, [{name: "suite", value: "CRUD equipment"}]);

    await homePage.selectVehicleType(VehicleType.TERMINAL_TRUCK);
    await equipmentTable.deleteEquipment("TT01");
})