import {Locator, Page} from '@playwright/test';
import * as path from "node:path";


export class EquipmentOverviewPage {
    readonly page: Page;
    readonly equipmentOverviewTable: Locator;
    readonly searchInput: Locator;
    readonly removeButton: Locator;
    readonly importButton: Locator;
    readonly exportButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.equipmentOverviewTable = page.locator('[class="tba-editable-grid equipment-table"]');
        this.searchInput = page.locator('input[placeholder="Equipment name"]');
        this.removeButton = page.getByText(' Remove ');
        this.importButton = page.locator('[class="v-input__prepend-outer"] button');
        this.exportButton = page.locator('[class="tba-editable-grid equipment-table"] button[class="tba-toolbar-icon-btn export-equipment-btn v-btn v-btn--icon v-btn--round theme--light v-size--default"]')
    }

    async deleteEquipment(equipmentName: string) {
        await this.equipmentOverviewTable.isVisible();
        await this.accessSearchInputAndFill(equipmentName);
        await this.openHamburgerMenu(equipmentName);
        await this.removeButton.click();
    }

    private async accessSearchInputAndFill(equipmentName: string) {
        await this.searchInput.fill(equipmentName);
        await this.searchInput.press('Enter');
    }

    private async openHamburgerMenu(equipmentName: string) {
        const hamburgerMenu = this.getHiddenMenuLocator(equipmentName);
        await hamburgerMenu.hover();
        await hamburgerMenu.click();
    }

    async openExportAllEquipmentMenu() {
        await this.exportButton.click();
    }

    async importAllEquipmentFromFile(fileName: string) {
        console.info('Importing equipment file...');
        const filePath = path.resolve(__dirname, '../../test-data/equipment', fileName);
        const fileChooser = await this.triggerFileChooser();
        await fileChooser.setFiles(filePath);

        console.info('Import completed.');
    }

    private async triggerFileChooser() {
        return await Promise.all([
            this.page.waitForEvent('filechooser'),
            this.importButton.click()
        ]).then(([fileChooser]) => fileChooser);
    }

    getHiddenMenuLocator(equipmentName: string): Locator {
        return this.page.locator(`//span[text()="${equipmentName}"]/../../../..//td//button//span/i`);
    }
}