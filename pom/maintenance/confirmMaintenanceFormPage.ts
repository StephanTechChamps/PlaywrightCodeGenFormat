import { expect, Locator, Page } from "@playwright/test";

export class ConfirmMaintenanceFormPage {
    readonly page: Page;
    readonly popupTitle: Locator;
    readonly dateLabel: Locator;
    readonly dateInput: Locator;
    readonly confirmBtn: Locator;
    readonly cancelBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.popupTitle = page.locator('.tba-dialog-title');
        this.dateLabel = page.locator('.tba-datetime-picker-label');
        this.dateInput = page.locator('//div[@class="tba-datetime-icon"]/parent::*//input');
        this.confirmBtn = page.locator('.tba-btn-outlined-lg.v-btn--has-bg');
        this.cancelBtn = page.locator('.tba-btn-text-lg.mr-2.v-btn--text');
    }

    async setMaintenanceEndDate(date: string): Promise<void> {
        await this.dateInput.fill('');
        await this.dateInput.fill(date);
        await this.dateInput.press('Enter');
    }

    async confirmMaintenance(date: string): Promise<void> {
        await expect(this.popupTitle).toHaveText("Complete planned maintenance?");
        await this.setMaintenanceEndDate(date);
        await this.clickConfirm();
    }

    async clickConfirm(): Promise<void> {
        await this.confirmBtn.click();
    }
}