import {test} from '../../fixtures/tests.fixtures'
import {VehicleType} from "../../enums/vehicleType";
import {Tag} from "../../enums/tag";
import {setExportEquipmentLabels} from "../../helpers/setExportedAllureLabels";
import {Severity} from "../../enums/Severity";

test.use({ignoreHTTPSErrors: true});

test("Export a specific selection of equipment",
    {
        tag: [Tag.HCT, Tag.SMOKE, Tag.REGRESSION]
    }, async ({homePage,equipmentOverviewPage,exportEquipmentFormPage}) => {
        await setExportEquipmentLabels(Severity.CRITICAL, Tag.SMOKE, [{ name: "suite", value: "Export equipment" }]);

        await homePage.selectVehicleType(VehicleType.REACH_STACKER);
        await equipmentOverviewPage.openExportAllEquipmentMenu();
        await exportEquipmentFormPage.exportSelectedEquipment("TwoFiles", ["RS01", "EH01"]);
    });

test("Export all equipment",
    {
        tag: [Tag.HCT, Tag.SMOKE, Tag.REGRESSION]
    }, async ({homePage,equipmentOverviewPage,exportEquipmentFormPage}) => {
        await setExportEquipmentLabels(Severity.CRITICAL, Tag.SMOKE, [{ name: "suite", value: "Export equipment" }]);

        await homePage.selectVehicleType(VehicleType.REACH_STACKER);
        await equipmentOverviewPage.openExportAllEquipmentMenu();
        await exportEquipmentFormPage.exportAllEquipment("AllFiles");
    })

