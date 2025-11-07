import {Locator, Page} from "@playwright/test";

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
    }

    async addMaintenanceForEquipment(startDate: string, endDate: string) {
        await this.selectEquipment();
        await this.fillDate(this.startDateField, startDate);
        await this.fillDate(this.endDateField, endDate);
        await this.planMaintenanceButton.click();
        await Promise.all([
            this.maintenanceFormTitle.isHidden(),
            this.equipmentTable.isVisible(),
        ]);
    }

    private async selectEquipment() {
        await this.pieceOfEquipmentField.click();
        await this.equipmentListItems.first().click();
    }

    private async fillDate(field: Locator, value: string) {
        await field.clear();
        await field.fill(value);
        await field.press('Enter');
    }

}