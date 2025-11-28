import {LoginPage} from "../pom/auth/loginPage";
import {BASE_URL, PASSWORD, USERNAME} from "../config/projectConfig";
import {test} from '../fixtures/tests.fixtures'
import {label, severity, tag} from "allure-js-commons";
import {MaintenancePage} from "../pom/maintenance/maintenancePage";
import {topMenuBarPage} from "../pom/navigation/topMenuBarPage"
import {AddMaintenanceFormPage} from "../pom/maintenance/addMaintenanceFormPage";
import {ConfirmMaintenanceFormPage} from "../pom/maintenance/confirmMaintenanceFormPage";
import {Page} from "playwright/test";
import {expect} from "@playwright/test";
import {vehicleCode} from "../enums/MaintenanceVehicleCode";

test.use({ignoreHTTPSErrors: true});

test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(BASE_URL, USERNAME, PASSWORD);
    await setAllureProperties();
});

// test.afterEach(async ({ page }) => {
//     const allRows = page.locator('//span[normalize-space(.)="COMPLETE MAINTENANCE"]/ancestor::button');
//     const confirmButton = page.locator('//span[normalize-space(.)="Complete"]/ancestor::button');
//
//     const count = await allRows.count();
//     for (let i = 0; i < count; i++) {
//         const row = allRows.nth(i);
//         await row.hover();
//         await row.click();
//         await confirmButton.click();
//         console.log(row.count + "deleted")
//     }
// });

async function setAllureProperties() {
    await severity('Critical');
    await tag('Smoke');
    await label('suite', "Maintenance tests");
}

const setupPages = (page: Page) => {
    const topMenuBar = new topMenuBarPage(page);
    const maintenancePage = new MaintenancePage(page);
    const addMaintenance = new AddMaintenanceFormPage(page)
    const confirmMaintenance = new ConfirmMaintenanceFormPage(page);
    return {topMenuBar, maintenancePage, addMaintenance, confirmMaintenance};
}

test("Create and complete maintenance schedule", async ({page}) => {
    const {topMenuBar, maintenancePage, addMaintenance, confirmMaintenance} = setupPages(page);
    await topMenuBar.openMaintenancePage();
    await maintenancePage.openCreateMaintenancePage();
    await addMaintenance.addMaintenanceEventForEquipment(vehicleCode.QC8, 'Nov 20, 2025 (15:20)', 'Nov 20, 2026 (20:00)');
    expect(await maintenancePage.validateHeadersArePresent()).toBe(true)
    expect(await maintenancePage.getActualMaintenanceTableData()).toEqual(
        [
            {
                equipmentName: 'QC08',
                plannedStartDate: 'Nov 20, 2025 (15:20)',
                plannedEndDate: 'Nov 20, 2026 (20:00)'
            }
        ]);
    await maintenancePage.openCompleteMaintenanceMenu(vehicleCode.QC8, 'Nov 20, 2025 (15:20)', 'Nov 20, 2026 (20:00)');
    await confirmMaintenance.confirmMaintenance('Nov 21, 2027 (20:00)');
});

test("Create, edit and delete a maintenance schedule", async ({page}) => {
    const {topMenuBar, maintenancePage, addMaintenance} = setupPages(page);
    await topMenuBar.openMaintenancePage();
    await maintenancePage.openCreateMaintenancePage();
    await addMaintenance.addMaintenanceEventForEquipment(vehicleCode.AL1, 'Nov 15, 2025 (15:47)', 'Nov 20, 2026 (10:00)');
    expect(await maintenancePage.getActualMaintenanceTableData()).toEqual(
        [
            {
                equipmentName: 'AL01',
                plannedStartDate: 'Nov 15, 2025 (15:47)',
                plannedEndDate: 'Nov 20, 2026 (10:00)',
            }
        ])
    await maintenancePage.editMaintenanceEvent(vehicleCode.AL1, 'Nov 15, 2025 (15:47)', 'Nov 20, 2026 (10:00)', 'Nov 20, 2026 (15:47)', 'Nov 25, 2026 (10:00)')
    expect(await maintenancePage.getActualMaintenanceTableData()).toEqual(
        [
            {
                equipmentName: 'AL01',
                plannedStartDate: 'Nov 20, 2026 (15:47)',
                plannedEndDate: 'Nov 25, 2026 (10:00)',
            }
        ])
    await maintenancePage.removeMaintenanceMaintenanceEvent(vehicleCode.AL1, 'Nov 20, 2026 (15:47)', 'Nov 25, 2026 (10:00)');
    await expect(maintenancePage.maintenanceTableRow).toHaveCount(0);
})

test("Arrange and filter table data", async ({page}) => {
    const {topMenuBar, maintenancePage, addMaintenance} = setupPages(page);
    await topMenuBar.openMaintenancePage();
    await maintenancePage.openCreateMaintenancePage();
    await addMaintenance.addMaintenanceEventForEquipment(vehicleCode.AL1, 'Nov 15, 2025 (15:47)', 'Nov 21, 2026 (10:00)');
    await maintenancePage.openCreateMaintenancePage();
    await addMaintenance.addMaintenanceEventForEquipment(vehicleCode.AL3, 'Nov 10, 2025 (15:47)', 'Nov 26, 2026 (10:00)');
    await maintenancePage.openCreateMaintenancePage();
    await addMaintenance.addMaintenanceEventForEquipment(vehicleCode.AW2, 'Nov 09, 2025 (15:47)', 'Nov 26, 2026 (10:00)');
    await maintenancePage.openCreateMaintenancePage();
    await addMaintenance.addMaintenanceEventForEquipment(vehicleCode.AW3, 'Nov 27, 2025 (15:47)', 'Nov 27, 2026 (10:00)');
    expect(await maintenancePage.getActualMaintenanceTableData()).toEqual(
        [
            {
                equipmentName: 'AL01',
                plannedStartDate: 'Nov 15, 2025 (15:47)',
                plannedEndDate: 'Nov 21, 2026 (10:00)',
            },
            {
                equipmentName: 'AL03',
                plannedStartDate: 'Nov 10, 2025 (15:47)',
                plannedEndDate: 'Nov 26, 2026 (10:00)'
            },
            {
                equipmentName: 'AW02',
                plannedStartDate: 'Nov 9, 2025 (15:47)',
                plannedEndDate: 'Nov 26, 2026 (10:00)',
            },
            {
                equipmentName: 'AW03',
                plannedStartDate: 'Nov 27, 2025 (15:47)',
                plannedEndDate: 'Nov 27, 2026 (10:00)',
            },
        ])
    await maintenancePage.applyFilter('AL');
    await maintenancePage.clickTableSortByHeader("Equipment")
    expect(await maintenancePage.getActualMaintenanceTableData()).toEqual(
        [
            {
                equipmentName: 'AL03',
                plannedStartDate: 'Nov 10, 2025 (15:47)',
                plannedEndDate: 'Nov 26, 2026 (10:00)',
            },
            {
                equipmentName: 'AL01',
                plannedStartDate: 'Nov 15, 2025 (15:47)',
                plannedEndDate: 'Nov 21, 2026 (10:00)',
            },

        ])
    await maintenancePage.applyFilter('');
    expect(await maintenancePage.getActualMaintenanceTableData()).toEqual(
        [{
            equipmentName: 'AW03',
            plannedStartDate: 'Nov 27, 2025 (15:47)',
            plannedEndDate: 'Nov 27, 2026 (10:00)',
        }, {
            equipmentName: 'AW02',
            plannedStartDate: 'Nov 9, 2025 (15:47)',
            plannedEndDate: 'Nov 26, 2026 (10:00)',
        },
            {
                equipmentName: 'AL03',
                plannedStartDate: 'Nov 10, 2025 (15:47)',
                plannedEndDate: 'Nov 26, 2026 (10:00)'
            },
            {
                equipmentName: 'AL01',
                plannedStartDate: 'Nov 15, 2025 (15:47)',
                plannedEndDate: 'Nov 21, 2026 (10:00)',
            }])
})