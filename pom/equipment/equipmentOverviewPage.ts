import {Locator, Page} from '@playwright/test';
import * as path from "node:path";

export class EquipmentOverviewPage {
    private readonly page: Page;
    private readonly importButton: Locator;
    private readonly exportButton: Locator;
    private readonly searchInput: Locator;


    constructor(page: Page) {
        this.page = page;
        this.importButton = page.locator('[class="v-input__prepend-outer"] button');
        this.exportButton = page.locator('[class="tba-editable-grid equipment-table"] button[class="tba-toolbar-icon-btn export-equipment-btn v-btn v-btn--icon v-btn--round theme--light v-size--default"]')
        this.searchInput = page.locator('input[placeholder="Equipment name"]');
    }

     async searchEquipment(equipmentName: string) {
        await this.searchInput.fill(equipmentName);
        await this.searchInput.press('Enter');
    }

     async clearSearchInput() {
        await this.searchInput.fill('');
        await this.searchInput.press('Enter');
    }

    async openExportAllEquipmentMenu() {
        await this.exportButton.click();
    }

    async importAllEquipmentFromHtcFile(fileName: string) {
        console.info('Importing equipment file...');
        const filePath = path.resolve(__dirname, '../../test-data/equipment/htc/', fileName);
        const fileChooser = await this.triggerFileChooser();
        await fileChooser.setFiles(filePath);
        console.info('Import completed.');
    }

    async importAllEquipmentFromCtbFile(fileName: string) {
        console.info('Importing equipment file...');
        const filePath = path.resolve(__dirname, '../../test-data/equipment/ctb/', fileName);
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
}