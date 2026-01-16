import {test} from '../../fixtures/tests.fixtures'
import {VehicleType} from "../../enums/vehicleType";
import {TestCategory} from "../../enums/TestCategory";
import {setExportEquipmentLabels} from "../../helpers/setExportedAllureLabels";
import {Severity} from "../../enums/Severity";
import {Terminal} from "../../enums/Terminal";

test.use({ignoreHTTPSErrors: true});

test("Export a specific selection of equipment",
    {
        tag: [Terminal.HCT, TestCategory.SMOKE, TestCategory.REGRESSION]
    }, async ({homePage,equipmentOverviewPage,exportEquipmentFormPage}) => {
        await setExportEquipmentLabels(Severity.CRITICAL, TestCategory.SMOKE, [{ name: "suite", value: "Export equipment" }]);

        await homePage.selectVehicleType(VehicleType.REACH_STACKER);
        await equipmentOverviewPage.openExportAllEquipmentMenu();
        await exportEquipmentFormPage.exportSelectedEquipment("TwoFiles", ["RS01", "EH01"]);
    });

test("Export all equipment",
    {
        tag: [Terminal.HCT, TestCategory.SMOKE, TestCategory.REGRESSION]
    }, async ({homePage,equipmentOverviewPage,exportEquipmentFormPage}) => {
        await setExportEquipmentLabels(Severity.CRITICAL, TestCategory.SMOKE, [{ name: "suite", value: "Export equipment" }]);

        await homePage.selectVehicleType(VehicleType.REACH_STACKER);
        await equipmentOverviewPage.openExportAllEquipmentMenu();
        await exportEquipmentFormPage.exportAllEquipment("AllFiles");
    })

