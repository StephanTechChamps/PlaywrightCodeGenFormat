import {expect, Locator, Page} from "@playwright/test";

export class topMenuBarPage {
    readonly page: Page;
    readonly leftMainMenuButton: Locator;
    readonly navigationMenuButton: Locator;
    readonly equipmentManagementButton: Locator;
    readonly maintenanceButton: Locator;
    readonly createMaintenanceItem: Locator;
    readonly topBarTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.leftMainMenuButton = page.locator('[class="tba-nav-bar__left"] button');
        this.navigationMenuButton = page.locator('[class="tba-navigation-menu-apps"]');
        this.equipmentManagementButton = page.locator('//span[text()=" Equipment Management "]/../button');
        this.maintenanceButton = page.locator('//span[text()=" Maintenance "]/../button');
        this.topBarTitle = page.locator('//span[text()=" Admin - Maintenance "]');
    }

    async openMaintenancePage() {
        await this.leftMainMenuButton.click();
        await this.navigationMenuButton.isVisible();
        await this.maintenanceButton.click();
        // await this.topBarTitle.isVisible();
    }

    async openEquipmentManagement() {
        await this.leftMainMenuButton.click();
        await this.navigationMenuButton.click();
        await this.equipmentManagementButton.click();
    }
}
