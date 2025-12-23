import {HomePage} from "../../pom/navigation/homePage";
import {test} from '../../fixtures/tests.fixtures'
import {label, severity, tag} from "allure-js-commons";
import {VehicleType} from "../../enums/vehicleType";
import {Page} from "@playwright/test";
import {EquipmentOverviewPage} from "../../pom/equipment/equipmentOverviewPage";
import {ExportEquipmentFormPage} from "../../pom/equipment/exportEquipmentFormPage"
import {Tag} from "../../enums/tag";

test.use({ignoreHTTPSErrors: true});

//@TODO: move this method so it doesn't have to written in every test
test.beforeEach(async ({page}) => {
    await page.goto("/");
    await setAllureProperties();
});

function setupPages(page: Page) {
    const homePage = new HomePage(page);
    const equipmentOverviewPage = new EquipmentOverviewPage(page)
    const exportEquipmentFormPage = new ExportEquipmentFormPage(page);
    return {homePage, equipmentOverviewPage, exportEquipmentFormPage};
}

async function setAllureProperties() {
    await severity("Critical");
    await tag("Smoke");
    await label("suite", "Export equipment");
}

test("Export a specific selection of equipment",
    {
        tag: [Tag.HTC, Tag.SMOKE, Tag.REGRESSION]
    }, async ({page}) => {
        const {homePage, equipmentOverviewPage, exportEquipmentFormPage} = setupPages(page);
        await homePage.selectVehicleType(VehicleType.REACH_STACKER);
        await equipmentOverviewPage.openExportAllEquipmentMenu();
        await exportEquipmentFormPage.exportSelectedEquipment("TwoFiles", ["RS01", "EH01"]);
    });

test("Export all equipment",
    {
        tag: [Tag.HTC, Tag.SMOKE, Tag.REGRESSION]
    }, async ({page}) => {
        const {homePage, equipmentOverviewPage, exportEquipmentFormPage} = setupPages(page);
        await homePage.selectVehicleType(VehicleType.REACH_STACKER);
        await equipmentOverviewPage.openExportAllEquipmentMenu();
        await exportEquipmentFormPage.exportAllEquipment("AllFiles");
    })

