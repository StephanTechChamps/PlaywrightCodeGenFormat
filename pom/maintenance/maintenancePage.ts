import {expect, Locator, Page} from "@playwright/test";
import {AddMaintenanceFormPage} from "./addMaintenanceFormPage";

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
    }

    async openCreateMaintenancePage(): Promise<void> {
        await this.page.goto('https://teamssrvse01.de.ad.tba.nl:9311/#/Maintenance');
        await expect(this.maintenancePage).toBeVisible();
        await expect(this.topBar).toBeVisible();
        await this.createButton.first().click();
    }

    async openEditMenu(equipment: string, start: string, end: string): Promise<void> {
        const menu = this.getHiddenMenuLocator(equipment, start, end);
        await menu.hover();
        await menu.click();
    }

    async editMaintenance(equipment: string, start: string, end: string, newDate: string, finalDate: string): Promise<void> {
        await this.openEditMenu(equipment, start, end);
        await this.editButton.click();
        const form = new AddMaintenanceFormPage(this.page)
        await form.addMaintenanceForEquipment(newDate, finalDate);
    }

    async removeMaintenance(equipment: string, start: string, end: string): Promise<void> {
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
}