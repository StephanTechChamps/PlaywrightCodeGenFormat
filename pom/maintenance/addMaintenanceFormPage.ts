import {Locator, Page} from "@playwright/test";
import {expect} from "../../fixtures/tests.fixtures";
import {vehicleCode} from "../../enums/MaintenanceVehicleCode";

export class AddMaintenanceFormPage {

    readonly page: Page;
    readonly maintenanceFormTitle: Locator;
    readonly createMaintenanceButton: Locator;
    readonly pieceOfEquipmentField: Locator;
    readonly startDateField: Locator;
    readonly endDateField: Locator;
    readonly cancelButton: Locator;
    readonly planMaintenanceButton: Locator;
    readonly equipmentTable: Locator;
    readonly equipmentListItems: Locator;
    readonly loadingSpinner: Locator;

    constructor(page: Page) {
        this.page = page;
        this.maintenanceFormTitle = page.locator('[data-cy="maintenance-dialog-title"]');
        this.createMaintenanceButton = page.locator('[class="toolbar-action-buttons"] button')
        this.pieceOfEquipmentField = page.locator('//span[@data-cy="equipment-selector"]//input[@autocomplete="off"]');
        this.equipmentListItems = page.locator('[class="tba-select__item"]');
        this.startDateField = page.locator('[name="startDate"] input');
        this.endDateField = page.locator('[name="endDate"] input');
        this.cancelButton = page.getByText(' Cancel ');
        this.planMaintenanceButton = page.getByText(' Plan maintenance ');
        this.equipmentTable = page.locator('[class="tba-grid-container"] table');
        this.loadingSpinner = page.locator('span[class="tba-notification-text"]').first();
    }

    async addMaintenanceEventForEquipment(vehicleCode: vehicleCode, startDate: string, endDate: string) {
        await this.selectEquipment(vehicleCode);
        await this.fillDate(this.startDateField, startDate);
        await this.fillDate(this.endDateField, endDate);
        await this.planMaintenanceButton.click();
        await Promise.all([
            this.maintenanceFormTitle.isHidden(),
            this.equipmentTable.isVisible(),
            expect(this.loadingSpinner).toBeVisible(),
            expect(this.loadingSpinner).toBeHidden()
        ]);
    }

    async editMaintenanceEventForEquipment(vehicleCode: vehicleCode, startDate: string, endDate: string) {
        await this.selectEquipment(vehicleCode);
        await this.fillDate(this.startDateField, startDate);
        await this.fillDate(this.endDateField, endDate);
        await this.planMaintenanceButton.click();
        await this.loadingSpinner.waitFor({state: 'visible'})
        await this.loadingSpinner.waitFor({state: 'hidden'})
    }

    private async fillDate(field: Locator, value: string) {
        await field.clear();
        await field.fill(value);
        await field.press('Enter');
    }

    private async selectEquipment(equipmentType: vehicleCode) {
        const listOption = this.page.locator(`//div[@class="tba-select__item"]//div//span[text()='${equipmentType}']`);
        await this.pieceOfEquipmentField.click();
        await this.pieceOfEquipmentField.fill(equipmentType)
        await listOption.click();
    }
}