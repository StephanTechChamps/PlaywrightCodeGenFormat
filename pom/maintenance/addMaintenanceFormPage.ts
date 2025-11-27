import {Locator, Page} from "@playwright/test";
import {expect} from "../../fixtures/tests.fixtures";
import {vehicleCode} from "../../fixtures/MaintenanceVehicleCode";
import {MaintenanceEventDTO} from "./dto/MaintenanceEventDTO";


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

    /**
     * Builder pattern voor het aanmaken van een onderhoudsevenement
     * @returns Builder instance
     */
    createMaintenanceEvent(): MaintenanceEventBuilder {
        return new MaintenanceEventBuilder(this);
    }

    /**
     * Builder pattern voor het bewerken van een onderhoudsevenement
     * @returns Builder instance
     */
    editMaintenanceEvent(): MaintenanceEventBuilder {
        return new MaintenanceEventBuilder(this, true);
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

/**
 * Builder klasse voor het fluent bouwen van onderhoudsevenementen
 */
export class MaintenanceEventBuilder {
    private readonly formPage: AddMaintenanceFormPage;
    private readonly isEdit: boolean;
    private dto?: MaintenanceEventDTO;

    constructor(formPage: AddMaintenanceFormPage, isEdit: boolean = false) {
        this.formPage = formPage;
        this.isEdit = isEdit;
    }

    /**
     * Stel het voertuig in
     */
    withVehicle(vehicleCode: vehicleCode): MaintenanceEventBuilder {
        if (!this.dto) {
            this.dto = new MaintenanceEventDTO(vehicleCode, '', '');
        } else {
            this.dto = this.dto.withVehicleCode(vehicleCode);
        }
        return this;
    }

    /**
     * Stel de startdatum in
     */
    withStartDate(startDate: string): MaintenanceEventBuilder {
        if (!this.dto) {
            this.dto = new MaintenanceEventDTO('' as vehicleCode, startDate, '');
        } else {
            this.dto = this.dto.withStartDate(startDate);
        }
        return this;
    }

    /**
     * Stel de einddatum in
     */
    withEndDate(endDate: string): MaintenanceEventBuilder {
        if (!this.dto) {
            this.dto = new MaintenanceEventDTO('' as vehicleCode, '', endDate);
        } else {
            this.dto = this.dto.withEndDate(endDate);
        }
        return this;
    }

    /**
     * Gebruik een bestaande DTO
     */
    withDTO(dto: MaintenanceEventDTO): MaintenanceEventBuilder {
        this.dto = dto;
        return this;
    }

    /**
     * Voer de actie uit (toevoegen of bewerken)
     */
    async submit(): Promise<void> {
        if (!this.dto) {
            throw new Error('DTO is niet ingesteld. Gebruik withVehicle(), withStartDate() en withEndDate() of withDTO()');
        }

        if (this.isEdit) {
            await this.formPage.editMaintenanceEventForEquipment(
                this.dto.vehicleCode,
                this.dto.startDate,
                this.dto.endDate
            );
        } else {
            await this.formPage.addMaintenanceEventForEquipment(
                this.dto.vehicleCode,
                this.dto.startDate,
                this.dto.endDate
            );
        }
    }
}