import {LoginPage} from "../pom/auth/loginPage";
import {BASE_URL, PASSWORD, USERNAME} from "../fixtures/projectConfig";
import {test} from '../fixtures/tests.fixtures'
import {label, severity, tag} from "allure-js-commons";
import {MaintenancePage} from "../pom/maintenance/maintenancePage";
import {topMenuBarPage} from "../pom/navigation/topMenuBarPage"
import {AddMaintenanceFormPage} from "../pom/maintenance/addMaintenanceFormPage";

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

const setupPages = (page) => {
    const topMenuBar = new topMenuBarPage(page);
    const maintenancePage = new MaintenancePage(page);
    const addMaintenance = new AddMaintenanceFormPage(page)
    return {topMenuBar, maintenancePage, addMaintenance};
}

test("Create and complete maintenance schedule", async ({page}) => {
    const {topMenuBar, maintenancePage, addMaintenance} = setupPages(page);
    await topMenuBar.openMaintenancePage();
    await maintenancePage.createMaintenance();
    await addMaintenance.addMaintenanceForEquipment('Nov 15, 2025 (15:47)', 'Nov 20, 2026 (10:00)');
});
