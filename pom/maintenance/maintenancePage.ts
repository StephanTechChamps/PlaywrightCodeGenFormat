// noinspection ES6MissingAwait

import {expect, Locator, Page} from "@playwright/test";
import {AddMaintenanceFormPage} from "./addMaintenanceFormPage";
import {MaintenanceTableRowData} from "./MaintenanceTableRowData";
import {MAINTENANCE_URL} from "../../fixtures/projectConfig";

export class MaintenancePage {
    readonly page: Page;
    readonly maintenancePage: Locator;
    readonly createButton: Locator;
    readonly topBar: Locator;
    readonly editButton: Locator;
    readonly removeButton: Locator;
    readonly popupTitle: Locator;
    readonly confirmRemoveButton: Locator;
    readonly cancelButton: Locator;
    readonly endDateField: Locator;
    readonly hoverIndicator: Locator;
    readonly headerElementPlannedStartDate: Locator;
    readonly allTableHeaderElements: Locator;
    readonly maintenanceTableRow: Locator;
    readonly equipmentElementFieldInRow: Locator;
    readonly plannedStartDateElementInRow: Locator;
    readonly plannedEndDateElementInRow: Locator;

    constructor(page: Page) {
        this.page = page;
        this.maintenancePage = page.locator('.planned-maintenance-page');
        this.createButton = page.locator('.toolbar-action-buttons button');
        this.topBar = page.locator('//span[text()=" Admin - Maintenance "]');
        this.editButton = page.locator('(//div[text()=" Edit maintenance " and contains(@class, "v-list-item__title")])[1]');
        this.removeButton = page.locator('(//div[text()=" Remove maintenance " and contains(@class, "v-list-item__title")])[1]');
        this.popupTitle = page.locator('.tba-dialog-title');
        this.confirmRemoveButton = page.locator('//span[text()=" Remove maintenance "]/ancestor::button');
        this.cancelButton = page.locator('//span[text()=" Cancel "]/ancestor::button');
        this.endDateField = page.locator('.end-date');
        this.hoverIndicator = page.locator('.v-ripple__container');
        this.allTableHeaderElements = page.locator(' [class="header-cell"] span[aria-expanded="false"]');
        this.headerElementPlannedStartDate = page.locator('//span[text()="Planned start date"]');
        this.maintenanceTableRow = page.locator('[class="tba-grid-container"] tr[class=""]');
        this.equipmentElementFieldInRow = page.locator('td span[aria-haspopup="true"]');
        this.plannedStartDateElementInRow = page.locator('td:nth-child(2)')
        this.plannedEndDateElementInRow = page.locator(' //td//div[@class="end-date"]//span[1]');
    }

    private async navigateToMaintenancePage() {
        await this.page.goto(MAINTENANCE_URL);
    }

    async openCreateMaintenancePage(): Promise<void> {
        this.navigateToMaintenancePage()
        await expect(this.maintenancePage).toBeVisible();
        await expect(this.topBar).toBeVisible();
        await this.createButton.first().click();
    }

    async openEditMenu(equipment: string, start: string, end: string): Promise<void> {
        const menu = this.getHiddenMenuLocator(equipment, start, end);
        await menu.hover();
        await menu.click();
    }

    async editMaintenanceEvent(equipment: string, start: string, end: string, newDate: string, finalDate: string): Promise<void> {
        await this.openEditMenu(equipment, start, end);
        await this.editButton.click();
        const form = new AddMaintenanceFormPage(this.page)
        await form.addMaintenanceEventForEquipment(newDate, finalDate);
    }

    async removeMaintenanceMaintenanceEvent(equipment: string, start: string, end: string): Promise<void> {
        await this.openEditMenu(equipment, start, end);
        await this.removeButton.click();
        await expect(this.popupTitle).toHaveText("Remove planned maintenance?");
        await this.confirmRemoveButton.click();
    }

    async openCompleteMaintenanceMenu(equipment: string, start: string, end: string): Promise<void> {
        const button = this.getCompleteMaintenanceButtonLocator(equipment, start, end);
        await button.hover();
        await expect(button).toBeVisible();
        await button.click();
    }

    getHiddenMenuLocator(equipment: string, start: string, end: string): Locator {
        return this.page.locator(
            `//span[text()="${equipment}"]/../../../..//td[text()=' ${start} ']/..//span[text()='${end}']/../../..//button[@class="tba-icon-default-important actions-on-hover v-btn v-btn--icon v-btn--round v-btn--text theme--light v-size--default"]`
        );
    }

    getCompleteMaintenanceButtonLocator(equipment: string, start: string, end: string): Locator {
        return this.page.locator(
            `//span[text()="${equipment}"]/../../../..//td[text()=" ${start} "]/..//span[text()="${end}"]/../../..//td[@class="pinned pinned--to-right pinned--to-right-first"]//button`
        ).first();
    }

    async asserDataTableIsVisible() {
        await expect(this.headerElementPlannedStartDate).toBeVisible();
    }


    async getAllHeaders() {
        this.navigateToMaintenancePage()
        const allTexts = await this.allTableHeaderElements.allTextContents();
        return allTexts.filter(text => text.trim() !== '');
    }

    async getActualMaintenanceTableData() {
        await this.navigateToMaintenancePage();
        this.asserDataTableIsVisible()
        const tableRows = await this.maintenanceTableRow.all();
        const actualWebTableData: MaintenanceTableRowData[] = await Promise.all(
            tableRows.map(async (row) => {
                return await this.mappedDataPerRow(row);
            })
        );
        return actualWebTableData;
    }

    private async mappedDataPerRow(row: Locator) {
        const equipmentName = await row.locator(this.equipmentElementFieldInRow).innerText();
        const plannedStartDate = await row.locator(this.plannedStartDateElementInRow).innerText();
        const plannedEndDate = await row.locator(this.plannedEndDateElementInRow).innerText();
        return {equipmentName, plannedStartDate, plannedEndDate};
    }
}