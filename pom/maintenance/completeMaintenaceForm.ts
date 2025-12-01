import {expect, Locator, Page} from "@playwright/test";

export class CompleteMaintenanceForm {
    readonly page: Page;
    readonly popupTitle: Locator;
    readonly dateInput: Locator;
    readonly confirmBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.popupTitle = page.locator('.tba-dialog-title');
        this.dateInput = page.locator('//div[@class="tba-datetime-icon"]/parent::*//input');
        this.confirmBtn = page.locator('.tba-btn-outlined-lg.v-btn--has-bg');
    }

    async setMaintenanceEndDate(date: string): Promise<void> {
        await this.dateInput.fill(date);
        await this.dateInput.fill(date);
        await this.dateInput.press('Enter');
    }

    async confirmMaintenance(date: string): Promise<void> {
        await expect(this.popupTitle).toContainText("Complete planned maintenance?");
        await this.setMaintenanceEndDate(date);
        await this.clickConfirm();
    }

    async clickConfirm(): Promise<void> {
        await this.confirmBtn.click();
    }
}