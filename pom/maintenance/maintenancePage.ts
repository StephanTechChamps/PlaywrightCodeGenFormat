import {expect, Locator, Page} from "@playwright/test";
import {MAINTENANCE_URL} from "../../config/projectConfig";
import {vehicleCode} from "../../enums/MaintenanceVehicleCode";

export class MaintenancePage {
    private readonly page: Page;
    private readonly maintenancePage: Locator;
    private readonly createButton: Locator;
    private readonly topBar: Locator;

    constructor(page: Page) {
        this.page = page;
        this.maintenancePage = page.locator('.planned-maintenance-page');
        this.createButton = page.locator('.toolbar-action-buttons button');
        this.topBar = page.locator('//span[text()=" Admin - Maintenance "]');
    }

    private async navigateToMaintenancePage() {
        await this.page.goto(MAINTENANCE_URL);
    }

    async openCreateMaintenancePage(): Promise<void> {
        await this.navigateToMaintenancePage()
        await expect(this.maintenancePage).toBeVisible();
        await expect(this.topBar).toBeVisible();
        await this.createButton.first().click();
    }

    async openCompletePlannedMaintenanceMenu(equipment: vehicleCode, start: string, end: string): Promise<void> {
        const button = this.getCompleteMaintenanceButtonLocator(equipment, start, end);
        await button.hover();
        await expect(button).toBeVisible();
        await button.click();
    }

    private getCompleteMaintenanceButtonLocator(equipment: string, start: string, end: string): Locator {
        return this.page.locator(
            `//span[text()="${equipment}"]/../../../..//td[text()=" ${start} "]/..//span[text()="${end}"]/../../..//td[@class="pinned pinned--to-right pinned--to-right-first"]//button`
        ).first();
    }
}