import {expect, Locator, Page} from "@playwright/test";

export class ExportEquipmentFormPage {
    readonly page: Page;
    readonly equipmentExportForm: Locator;
    readonly fileInput: Locator;
    readonly selectAllEquipmentButton: Locator;
    readonly exportButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.equipmentExportForm = page.getByText('Export equipment');
        this.fileInput = page.locator('//label[text()="* File name"]/following-sibling::input');
        this.selectAllEquipmentButton = page.locator('//div[text()="Equipment name"]/preceding-sibling::div//input[@role="checkbox"]');
        this.exportButton = page.locator('[class=\"btn-right-wrapper\"] button');
    }

    async exportAllEquipment(fileName: string) {
        await this.fillInExportFileName(fileName);
        await this.selectAllEquipmentButton.scrollIntoViewIfNeeded();
        await this.selectAllEquipmentButton.click({force: true});
        await this.exportButton.click();
    }

    async exportSelectedEquipment(fileName: string, equipmentList: string[]) {
        await this.fillInExportFileName(fileName);
        for (const item of equipmentList) {
            const selectBox = await this.getCheckboxLocator(item);
            await selectBox.click();
        }
        await this.exportButton.click();
    }

    private async fillInExportFileName(fileName: string) {
        await expect(this.equipmentExportForm).toBeVisible();
        await this.fileInput.fill(fileName);
    }

    async getCheckboxLocator(equipmentName: string): Promise<Locator> {
        return this.page.locator(`//div[@class="checkbox-container"]/following-sibling::div[text()="${equipmentName}"]`);
    }
}