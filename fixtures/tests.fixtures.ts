import { test as base, expect as baseExpect } from '@playwright/test';

import { HomePage } from '../pom/navigation/homePage';
import { TopMenuBarPage } from '../pom/navigation/topMenuBarPage';

import { EquipmentTable } from '../pom/equipment/equipmentTable';
import { EquipmentOverviewPage } from '../pom/equipment/equipmentOverviewPage';
import { ExportEquipmentFormPage } from '../pom/equipment/exportEquipmentFormPage';
import { ConfirmDeleteEquipmentFormPage } from '../pom/equipment/confirmDeleteEquipmentFormPage';

import { AddAcsFormPage } from '../pom/equipment/addForm/addAcsFormPage';
import { AddAgvFormPage } from '../pom/equipment/addForm/addAgvFormPage';
import { AddArmgFormPage } from '../pom/equipment/addForm/addArmgFormPage';
import { AddArtgFormPage } from '../pom/equipment/addForm/addArtgFormPage';
import { AddAstradFormPage } from '../pom/equipment/addForm/addAstradFormPage';
import { AddMscFormPage } from '../pom/equipment/addForm/addMscFormPage';
import { AddQCFormPage } from '../pom/equipment/addForm/addQCFormPage';
import { AddRemoteOperatingStationFormPage } from '../pom/equipment/addForm/addRemoteOperatingStationFormPage';

import { EditAcsFormPage } from '../pom/equipment/editForm/editAcsFormPage';
import { EditAgvFormPage } from '../pom/equipment/editForm/editAgvFormPage';
import { EditArmgFormPage } from '../pom/equipment/editForm/editArmgFormPage';
import { EditQCFormPage } from '../pom/equipment/editForm/editQCFormPage';

import { AddMaintenanceFormPage } from '../pom/maintenance/addMaintenanceFormPage';
import { CompleteMaintenanceForm } from '../pom/maintenance/completeMaintenaceForm';
import { MaintenancePage } from '../pom/maintenance/maintenancePage';
import { MaintenanceTable } from '../pom/maintenance/maintenanceTable';

type PagesFixture = {

    homePage: HomePage;
    topMenuBarPage: TopMenuBarPage;

    addAcsFormPage: AddAcsFormPage;
    addAgvFormPage: AddAgvFormPage;
    addArmgFormPage: AddArmgFormPage;
    addArtgFormPage: AddArtgFormPage;
    addAstradFormPage: AddAstradFormPage;
    addMscFormPage: AddMscFormPage;
    addQCFormPage: AddQCFormPage;
    addRemoteOperatingStationFormPage: AddRemoteOperatingStationFormPage;

    editAcsFormPage: EditAcsFormPage;
    editAgvFormPage: EditAgvFormPage;
    editArmgFormPage: EditArmgFormPage;
    editQCFormPage: EditQCFormPage;

    equipmentTable: EquipmentTable;
    equipmentOverviewPage: EquipmentOverviewPage;
    exportEquipmentFormPage: ExportEquipmentFormPage;
    confirmDeleteEquipmentFormPage: ConfirmDeleteEquipmentFormPage;

    addMaintenanceFormPage: AddMaintenanceFormPage;
    completeMaintenanceForm: CompleteMaintenanceForm;
    maintenancePage: MaintenancePage;
    maintenanceTable: MaintenanceTable;
};

export const test = base.extend<PagesFixture>({
    page: async ({ page }, use, testInfo) => {
        await page.goto('/');

        const net: string[] = [];
        page.on('request', req => {
            net.push(`--> ${req.method()} ${req.url()}`);
        });

        page.on('response', res => {
            const req = res.request();
            net.push(`<-- ${req.method()} ${res.url()} ${res.status()}`);
        });

        await use(page);

        if (testInfo.status !== testInfo.expectedStatus) {
            await testInfo.attach('network.log', {
                body: net.join('\n'),
                contentType: 'text/plain',
            });

            const shotPath = testInfo.outputPath('last-state.png');
            await page.screenshot({ path: shotPath, fullPage: true });

            await testInfo.attach('last-state.png', {
                path: shotPath,
                contentType: 'image/png',
            });
        }
    },

    homePage: async ({ page }, use) => use(new HomePage(page)),
    topMenuBarPage: async ({ page }, use) => use(new TopMenuBarPage(page)),

    equipmentTable: async ({ page }, use) => use(new EquipmentTable(page)),
    equipmentOverviewPage: async ({ page }, use) => use(new EquipmentOverviewPage(page)),
    exportEquipmentFormPage: async ({ page }, use) => use(new ExportEquipmentFormPage(page)),
    confirmDeleteEquipmentFormPage: async ({ page }, use) =>
        use(new ConfirmDeleteEquipmentFormPage(page)),

    addAcsFormPage: async ({ page }, use) => use(new AddAcsFormPage(page)),
    addAgvFormPage: async ({ page }, use) => use(new AddAgvFormPage(page)),
    addArmgFormPage: async ({ page }, use) => use(new AddArmgFormPage(page)),
    addArtgFormPage: async ({ page }, use) => use(new AddArtgFormPage(page)),
    addAstradFormPage: async ({ page }, use) => use(new AddAstradFormPage(page)),
    addMscFormPage: async ({ page }, use) => use(new AddMscFormPage(page)),
    addQCFormPage: async ({ page }, use) => use(new AddQCFormPage(page)),
    addRemoteOperatingStationFormPage: async ({ page }, use) =>
        use(new AddRemoteOperatingStationFormPage(page)),

    editAcsFormPage: async ({ page }, use) => use(new EditAcsFormPage(page)),
    editAgvFormPage: async ({ page }, use) => use(new EditAgvFormPage(page)),
    editArmgFormPage: async ({ page }, use) => use(new EditArmgFormPage(page)),
    editQCFormPage: async ({ page }, use) => use(new EditQCFormPage(page)),

    addMaintenanceFormPage: async ({ page }, use) => use(new AddMaintenanceFormPage(page)),
    completeMaintenanceForm: async ({ page }, use) =>
        use(new CompleteMaintenanceForm(page)),
    maintenancePage: async ({ page }, use) => use(new MaintenancePage(page)),
    maintenanceTable: async ({ page }, use) => use(new MaintenanceTable(page)),
});

export const expect = baseExpect;
