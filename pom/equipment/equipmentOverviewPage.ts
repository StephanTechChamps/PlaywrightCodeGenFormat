import {expect, Locator, Page} from '@playwright/test';
import * as path from "node:path";
import {EquipmentTableRowData} from "./EquipmentTableRowData";

export class EquipmentOverviewPage {
    readonly page: Page;
    readonly equipmentOverviewTable: Locator;
    readonly searchInput: Locator;
    readonly removeButton: Locator;
    readonly importButton: Locator;
    readonly exportButton: Locator;
    readonly equipmentTable: Locator;
    readonly headerElements: Locator;
    readonly tableRow: Locator;
    readonly rowElement: Locator;

    constructor(page: Page) {
        this.page = page;
        this.equipmentOverviewTable = page.locator('[class="tba-editable-grid equipment-table"]');
        this.searchInput = page.locator('input[placeholder="Equipment name"]');
        this.removeButton = page.getByText(' Remove ');
        this.importButton = page.locator('[class="v-input__prepend-outer"] button');
        this.exportButton = page.locator('[class="tba-editable-grid equipment-table"] button[class="tba-toolbar-icon-btn export-equipment-btn v-btn v-btn--icon v-btn--round theme--light v-size--default"]')

        this.equipmentTable = page.locator('[class="tba-editable-grid equipment-table"]')
        this.headerElements = page.locator('[class="tba-grid-header"] th span[aria-haspopup="true"]');

        this.tableRow = page.locator('[class="tba-editable-grid equipment-table"] tr[class=""]');
        this.rowElement = page.locator('[aria-haspopup="true"]');

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

    async asserDataTableIsVisible() {
        await expect(this.equipmentTable).toBeVisible();
    }

    async getAllHeadersOfDataTable() {
        await this.asserDataTableIsVisible();
        const headerElements = await this.headerElements.allTextContents();
        return headerElements.filter(text => text.trim() != "");
    }

    async getActualEquipmentTableData(): Promise<EquipmentTableRowData[]> {
        await this.asserDataTableIsVisible();
        return Promise.all(
            (await this.tableRow.all()).map(async (row) => {
                const values = await row.locator(this.rowElement).allTextContents();
                return this.mapAllValuesToObjects(values.map(v => v.trim()));
            })
        );
    }


    private mapAllValuesToObjects(value: string[]) {
        const data: EquipmentTableRowData = {
            name: value[0] ?? '',
            length: value[1] ?? '',
            width: value[2] ?? '',
            maxWeight: value[3] ?? '',
            liftCapability: value[4] ?? '',
            maxTwinWeightDifference: value[5] ?? '',
            maxTierHeight: value[6] ?? '',
            softwareVersion: value[7] ?? '',
            hostName: value[8] ?? '',
            automationPort: value[9] ?? '',
            stackProfilingPort: value[10] ?? '',
            craneId: value[11] ?? '',
            boundary: value[12] ?? '',
        };
        return data;
    }
}