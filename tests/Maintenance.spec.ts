import {LoginPage} from "../pom/auth/loginPage";
import {BASE_URL, PASSWORD, USERNAME} from "../fixtures/projectConfig";
import {test} from '../fixtures/tests.fixtures'
import {label, severity, tag} from "allure-js-commons";
import {MaintenancePage} from "../pom/maintenance/maintenancePage";
import {topMenuBarPage} from "../pom/navigation/topMenuBarPage"
import {AddMaintenanceFormPage} from "../pom/maintenance/addMaintenanceFormPage";
import {ConfirmMaintenanceFormPage} from "../pom/maintenance/confirmMaintenanceFormPage";
import {Page} from "playwright/test";

test.use({ignoreHTTPSErrors: true});

// Log in before each test in this file
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
    await addMaintenance.addMaintenanceForEquipment('Nov 20, 2025 (15:20)', 'Nov 20, 2026 (20:00)');
    await maintenancePage.openCompleteMaintenanceMenu("AW01", 'Nov 20, 2025 (15:20)', 'Nov 20, 2026 (20:00)');
    await confirmMaintenance.confirmMaintenance('Nov 20, 2026 (20:00)');
});

test("Create and delete a maintenance schedule", async ({page}) => {
    const {topMenuBar, maintenancePage, addMaintenance} = setupPages(page);
    await topMenuBar.openMaintenancePage();
    await maintenancePage.openCreateMaintenancePage();
    await addMaintenance.addMaintenanceForEquipment('Nov 15, 2025 (15:47)', 'Nov 20, 2026 (10:00)');
    await maintenancePage.removeMaintenance("AW01",'Nov 15, 2025 (15:47)', 'Nov 20, 2026 (10:00)');
})

test("Create and cancel a edit schedule", async ({page} ) => {
    const {topMenuBar, maintenancePage, addMaintenance} = setupPages(page);
    await topMenuBar.openMaintenancePage();
    await maintenancePage.openCreateMaintenancePage();
    await addMaintenance.addMaintenanceForEquipment('Nov 22, 2025 (15:47)', 'Nov 25, 2027 (10:00)');
    await maintenancePage.editMaintenance("AW01",'Nov 22, 2025 (15:47)', 'Nov 25, 2027 (10:00)','Nov 23, 2025 (08:47)', 'Dec 23, 2027 (23:59)');
})
