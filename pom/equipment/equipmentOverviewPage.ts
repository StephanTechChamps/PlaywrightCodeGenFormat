import {Page, Locator} from '@playwright/test';



export class equipmentOverviewPage {
    readonly page: Page;
    readonly equipmentOverviewTable: Locator;
    readonly searchInput: Locator;
    readonly removeButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.equipmentOverviewTable = page.locator('[class="tba-editable-grid equipment-table"]');
        this.searchInput = page.locator('input[placeholder="Equipment name"]');
        this.removeButton = page.getByText(' Remove ');
    }

    async deleteEquipment(equipmentName: string) {
        await this.equipmentOverviewTable.isVisible();
        await this.searchInput.fill(equipmentName);
        await this.searchInput.press('Enter');

        const hamburgerMenu = this.getHamburgerMenuLocator(equipmentName);
        await hamburgerMenu.hover();
        await hamburgerMenu.click();

        await this.removeButton.click();
    }

    async exportAllEquipment(){

    }

    getHamburgerMenuLocator(equipmentName: string): Locator {
        return this.page.locator(`//span[text()="${equipmentName}"]/../../../..//td//button//span/i`);
    }
}