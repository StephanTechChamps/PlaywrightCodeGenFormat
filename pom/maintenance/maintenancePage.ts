import {expect, Locator, Page} from "@playwright/test";
import {VehicleType} from "../../fixtures/vehicleType";

export class MaintenancePage {
    readonly page: Page;
    readonly maintenancePage: Locator;
    readonly createMaintenanceItem: Locator;
    readonly topBarSetToMaintenance: Locator;


    constructor(page: Page) {
        this.page = page;
        this.maintenancePage = page.locator('[class="planned-maintenance-page"]');
        this.createMaintenanceItem = page.locator('[class="toolbar-action-buttons"] button');
        this.topBarSetToMaintenance = page.locator('//span[text()=" Admin - Maintenance "]');
    }

    async createMaintenance() {
        await this.page.goto('https://teamssrvse01.de.ad.tba.nl:9311/#/Maintenance');
        await this.maintenancePage.isVisible()
        await this.topBarSetToMaintenance.isVisible();
        await this.createMaintenanceItem.first().click();
    }
}