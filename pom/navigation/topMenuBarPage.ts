import { Locator, Page} from "@playwright/test";

export class topMenuBarPage {
    private readonly leftMainMenuButton: Locator;
    private readonly navigationMenuButton: Locator;
    private readonly equipmentManagementButton: Locator;
    private readonly maintenanceButton: Locator;
    private readonly createMaintenanceItem: Locator;
    private readonly topBarTitle: Locator;

    constructor(page: Page) {
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
    }

    async openEquipmentManagement() {
        await this.leftMainMenuButton.click();
        await this.navigationMenuButton.click();
        await this.equipmentManagementButton.click();
    }
}
