import {test} from "../../fixtures/tests.fixtures";
import {VehicleType} from "../../enums/vehicleType";
import {setExportEquipmentLabels} from "../../helpers/setExportedAllureLabels";
import {Severity} from "../../enums/Severity";
import {Tag} from "../../enums/tag";

test.use({ignoreHTTPSErrors: true});


test("Delete equipment-type A-RMG", {
    tag: [Tag.HTC, Tag.REGRESSION]
}, async ({homePage, equipmentTable}) => {
    await setExportEquipmentLabels(Severity.TRIVIAL, Tag.REGRESSION, [{name: "suite", value: "CRUD equipment"}]);

    await homePage.selectVehicleType(VehicleType.A_RMG);
    await equipmentTable.deleteEquipment("AL01");
});

test("Delete equipment-type MSC", {
    tag: [Tag.HTC, Tag.REGRESSION]
}, async ({homePage, equipmentTable}) => {
    await setExportEquipmentLabels(Severity.TRIVIAL, Tag.REGRESSION, [{name: "suite", value: "CRUD equipment"}]);

    await homePage.selectVehicleType(VehicleType.MSC);
    await equipmentTable.deleteEquipment("SH01");
})

test("Delete equipment-type QC", {
    tag: [Tag.HTC, Tag.REGRESSION]
}, async ({homePage, equipmentTable}) => {
    await setExportEquipmentLabels(Severity.TRIVIAL, Tag.REGRESSION, [{name: "suite", value: "CRUD equipment"}]);

    await homePage.selectVehicleType(VehicleType.QC);
    await equipmentTable.deleteEquipment("QC01");
})

test("Delete equipment-type REACH-STACKER", {
    tag: [Tag.HTC, Tag.REGRESSION]
}, async ({homePage, equipmentTable}) => {
    await setExportEquipmentLabels(Severity.TRIVIAL, Tag.REGRESSION, [{name: "suite", value: "CRUD equipment"}]);

    await homePage.selectVehicleType(VehicleType.REACH_STACKER);
    await equipmentTable.deleteEquipment("RS01");
})

test("Delete equipment-type Terminal Truck", {
    tag: [Tag.HTC, Tag.REGRESSION]
}, async ({homePage, equipmentTable}) => {
    await setExportEquipmentLabels(Severity.TRIVIAL, Tag.REGRESSION, [{name: "suite", value: "CRUD equipment"}]);

    await homePage.selectVehicleType(VehicleType.TERMINAL_TRUCK);
    await equipmentTable.deleteEquipment("TT01");
})