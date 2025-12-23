
import {expect, test} from '../../fixtures/tests.fixtures'
import {vehicleCode} from "../../enums/MaintenanceVehicleCode";
import {DURATION} from "../../config/DURATION"
import {Tag} from "../../enums/tag";
import {setExportEquipmentLabels} from "../../helpers/setExportedAllureLabels";
import {Severity} from "../../enums/Severity";

test.use({ignoreHTTPSErrors: true});

//@TODO: tests for CTB USE OTHER TEST DATA FOR EQUIPMENT!
//@TODO: optimize this method: is now used as a setup/teardown for maintenance
test.afterEach(async ({page}) => {
    const rows = () => page.locator('//span[text()=" COMPLETE MAINTENANCE "]/ancestor::button');
    const confirm = page.locator('//span[text()=" Complete "]/ancestor::button');

    while (await rows().count() > 1) {
        const row = rows().first();
        await page.waitForSelector('.v-overlay__scrim', {state: 'hidden', timeout: DURATION.MEDIUM}).catch(() => {
        });
        await row.hover();
        await row.click();
        await confirm.click();
    }
});

test("Create and complete maintenance schedule",
    {tag: [Tag.HCT, Tag.SMOKE, Tag.REGRESSION]},
    async ({
               topMenuBarPage,
               maintenancePage,
               addMaintenanceFormPage,
               completeMaintenanceForm,
               maintenanceTable
           }) => {
        await setExportEquipmentLabels(Severity.CRITICAL, Tag.SMOKE, [{name: "suite", value: "CRUD maintenance"}]);

        await topMenuBarPage.openMaintenancePage();
        await maintenancePage.openCreateMaintenancePage();
        await addMaintenanceFormPage.addMaintenanceEventForEquipment(vehicleCode.QC8, 'Nov 20, 2025 (15:20)', 'Nov 20, 2026 (20:00)');
        expect(await maintenanceTable.validateHeadersArePresent()).toBe(true);
        expect(await maintenanceTable.getActualEquipmentTableData()).toEqual(
            [
                {
                    equipmentName: 'QC08',
                    plannedStartDate: 'Nov 20, 2025 (15:20)',
                    plannedEndDate: 'Nov 20, 2026 (20:00)'
                }
            ]);

        await maintenancePage.openCompletePlannedMaintenanceMenu(vehicleCode.QC8, 'Nov 20, 2025 (15:20)', 'Nov 20, 2026 (20:00)');
        await completeMaintenanceForm.confirmMaintenance('Nov 21, 2027 (20:00)');
    });

test("Create, edit and delete a maintenance schedule", {
        tag: [Tag.HCT, Tag.REGRESSION]
    },
    async ({
               topMenuBarPage,
               maintenancePage,
               addMaintenanceFormPage,
               maintenanceTable
           }) => {
        await setExportEquipmentLabels(Severity.CRITICAL, Tag.SMOKE, [{name: "suite", value: "CRUD maintenance"}]);

        await topMenuBarPage.openMaintenancePage();
        await maintenancePage.openCreateMaintenancePage();
        await addMaintenanceFormPage.addMaintenanceEventForEquipment(vehicleCode.AL1, 'Nov 15, 2025 (15:47)', 'Nov 20, 2026 (10:00)');
        expect(await maintenanceTable.getActualEquipmentTableData()).toEqual(
            [
                {
                    equipmentName: 'AL01',
                    plannedStartDate: 'Nov 15, 2025 (15:47)',
                    plannedEndDate: 'Nov 20, 2026 (10:00)',
                }
            ])
        await maintenanceTable.editMaintenanceEvent(vehicleCode.AL1, 'Nov 15, 2025 (15:47)', 'Nov 20, 2026 (10:00)', 'Nov 20, 2026 (15:47)', 'Nov 25, 2026 (10:00)')
        expect(await maintenanceTable.getActualEquipmentTableData()).toEqual(
            [
                {
                    equipmentName: 'AL01',
                    plannedStartDate: 'Nov 20, 2026 (15:47)',
                    plannedEndDate: 'Nov 25, 2026 (10:00)',
                }
            ])
        await maintenanceTable.removeMaintenanceMaintenanceEvent(vehicleCode.AL1, 'Nov 20, 2026 (15:47)', 'Nov 25, 2026 (10:00)');
        await expect.poll(async () => {
            return await maintenanceTable.getActualEquipmentTableData();
        }, {timeout: DURATION.LONG}).toHaveLength(0)
    })

test("Arrange and filter table data",
    {
        tag: [Tag.HCT, Tag.REGRESSION]
    }, async ({topMenuBarPage, maintenancePage, addMaintenanceFormPage, maintenanceTable}) => {
        await setExportEquipmentLabels(Severity.TRIVIAL, Tag.REGRESSION, [{name: "suite", value: "CRUD maintenance"}]);

        await topMenuBarPage.openMaintenancePage();
        await maintenancePage.openCreateMaintenancePage();
        await addMaintenanceFormPage.addMaintenanceEventForEquipment(vehicleCode.AL1, 'Nov 15, 2025 (15:47)', 'Nov 21, 2026 (10:00)');
        await maintenancePage.openCreateMaintenancePage();
        await addMaintenanceFormPage.addMaintenanceEventForEquipment(vehicleCode.AL3, 'Nov 10, 2025 (15:47)', 'Nov 26, 2026 (10:00)');
        await maintenancePage.openCreateMaintenancePage();
        await addMaintenanceFormPage.addMaintenanceEventForEquipment(vehicleCode.AW2, 'Nov 09, 2025 (15:47)', 'Nov 26, 2026 (10:00)');
        await maintenancePage.openCreateMaintenancePage();
        await addMaintenanceFormPage.addMaintenanceEventForEquipment(vehicleCode.AW3, 'Nov 27, 2025 (15:47)', 'Nov 27, 2026 (10:00)');
        expect(await maintenanceTable.getActualEquipmentTableData()).toEqual(
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
        await maintenanceTable.applyFilter('AL');
        await maintenanceTable.clickTableSortByHeader("Equipment")
        expect(await maintenanceTable.getActualEquipmentTableData()).toEqual(
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
        await maintenanceTable.applyFilter('');
        expect(await maintenanceTable.getActualEquipmentTableData()).toEqual(
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