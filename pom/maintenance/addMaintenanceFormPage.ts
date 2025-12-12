import {Locator, Page} from "@playwright/test";
import {vehicleCode} from "../../enums/MaintenanceVehicleCode";

export class AddMaintenanceFormPage {

    private readonly page: Page;
    private readonly maintenanceFormTitle: Locator;
    private readonly pieceOfEquipmentField: Locator;
    private readonly startDateField: Locator;
    private readonly endDateField: Locator;
    private readonly planMaintenanceButton: Locator;
    private readonly equipmentTable: Locator;
    private readonly loadingSpinner: Locator;


    constructor(page: Page) {
        this.page = page;
        this.maintenanceFormTitle = page.locator('[data-cy="maintenance-dialog-title"]');
        this.pieceOfEquipmentField = page.locator('//span[@data-cy="equipment-selector"]//input[@autocomplete="off"]');
        this.startDateField = page.locator('[name="startDate"] input');
        this.endDateField = page.locator('[name="endDate"] input');
        this.planMaintenanceButton = page.getByText(' Plan maintenance ');
        this.equipmentTable = page.locator('[class="tba-grid-container"] table');
        this.loadingSpinner = page.locator('span[class="tba-notification-text"]').first();
    }

    private async selectEquipment(equipmentType: vehicleCode) {
        const listOption = this.returnListOption(equipmentType);
        await this.pieceOfEquipmentField.click();
        await this.pieceOfEquipmentField.fill(equipmentType)
        await listOption.click();
    }

    private returnListOption(equipmentType: vehicleCode) {
        return this.page.locator(`//div[@class="tba-select__item"]//div//span[text()='${equipmentType}']`);
    }

    private async fillDate(field: Locator, value: string) {
        await field.clear();
        await field.fill(value);
        await field.press('Enter');
    }

    private async fillInFormData(vehicleCode: vehicleCode, startDate: string, endDate: string) {
        await this.selectEquipment(vehicleCode);
        await this.fillDate(this.startDateField, startDate);
        await this.fillDate(this.endDateField, endDate);
    }

    private async submitForm() {
        await this.planMaintenanceButton.click();
        await this.waitForSpinnerToDisappear();
    }

    async addMaintenanceEventForEquipment(vehicleCode: vehicleCode, startDate: string, endDate: string) {
        await this.fillInFormData(vehicleCode, startDate, endDate);
        await this.submitForm();
        await this.maintenanceFormTitle.waitFor({ state: 'hidden' });
        await this.equipmentTable.waitFor({ state: 'visible' });
    }

    async editMaintenanceEventForEquipment(vehicleCode: vehicleCode, startDate: string, endDate: string) {
        await this.fillInFormData(vehicleCode, startDate, endDate);
        await this.submitForm();
    }

    private async waitForSpinnerToDisappear() {
        await this.loadingSpinner.waitFor({state: 'visible'})
        await this.loadingSpinner.waitFor({state: 'hidden'})
    }
}