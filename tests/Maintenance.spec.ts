import {LoginPage} from "../pom/auth/loginPage";
import {BASE_URL, PASSWORD, USERNAME} from "../fixtures/projectConfig";
import {test} from '../fixtures/tests.fixtures'
import {label, severity, tag} from "allure-js-commons";
import {MaintenancePage} from "../pom/maintenance/maintenancePage";
import {topMenuBarPage} from "../pom/navigation/topMenuBarPage"
import {AddMaintenanceFormPage} from "../pom/maintenance/addMaintenanceFormPage";
import {ConfirmMaintenanceFormPage} from "../pom/maintenance/confirmMaintenanceFormPage";
import {Page} from "playwright/test";
import {expect} from "@playwright/test";

test.use({ignoreHTTPSErrors: true});

test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(BASE_URL, USERNAME, PASSWORD);
    await setAllureProperties();
});

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
    await addMaintenance.addMaintenanceEventForEquipment('Nov 20, 2025 (15:20)', 'Nov 20, 2026 (20:00)');
    await maintenancePage.openCompleteMaintenanceMenu("AW01", 'Nov 20, 2025 (15:20)', 'Nov 20, 2026 (20:00)');
    await confirmMaintenance.confirmMaintenance('Nov 20, 2026 (20:00)');
});

test("Create and delete a maintenance schedule", async ({page}) => {
    const {topMenuBar, maintenancePage, addMaintenance} = setupPages(page);
    await topMenuBar.openMaintenancePage();
    await maintenancePage.openCreateMaintenancePage();
    await addMaintenance.addMaintenanceEventForEquipment('Nov 15, 2025 (15:47)', 'Nov 20, 2026 (10:00)');
    await maintenancePage.removeMaintenanceMaintenanceEvent("AW01", 'Nov 15, 2025 (15:47)', 'Nov 20, 2026 (10:00)');
})

test("Create and edit schedule", async ({page}) => {
    const {topMenuBar, maintenancePage, addMaintenance} = setupPages(page);
    await topMenuBar.openMaintenancePage();
    await maintenancePage.openCreateMaintenancePage();
    await addMaintenance.addMaintenanceEventForEquipment('Nov 22, 2025 (15:47)', 'Nov 25, 2027 (10:00)');
    await maintenancePage.editMaintenanceEvent("AW01", 'Nov 22, 2025 (15:47)', 'Nov 25, 2027 (10:00)', 'Nov 23, 2025 (08:47)', 'Dec 23, 2027 (23:59)');
})

test("Validate the data of the maintenance table", async ({page}) => {
    const {topMenuBar, maintenancePage} = setupPages(page);
    await topMenuBar.openMaintenancePage();
    const headers = await maintenancePage.getAllHeadersOfDataTable();
    expect(headers).toEqual(['Equipment', 'Planned start date', 'Planned end date']);
    expect(await maintenancePage.getActualMaintenanceTableData()).toEqual(
        [
            {
                equipmentName: 'AW02',
                plannedStartDate: 'Nov 2, 2025 (17:39)',
                plannedEndDate: 'Nov 13, 2025 (17:39)'
            },
            {
                equipmentName: 'AL02',
                plannedStartDate: 'Nov 17, 2025 (17:30)',
                plannedEndDate: 'Nov 25, 2025 (17:30)'
            },
            {
                equipmentName: 'AW05',
                plannedStartDate: 'Nov 17, 2025 (17:30)',
                plannedEndDate: 'Nov 30, 2025 (17:30)'
            },
            {
                equipmentName: "AW01",
                plannedStartDate: "Nov 23, 2025 (08:47)",
                plannedEndDate: "Dec 23, 2027 (23:59)"
            }
        ]
    );
})
