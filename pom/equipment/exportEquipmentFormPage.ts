import {Locator, Page} from "@playwright/test";

export class ExportEquipmentFormPage {
    private readonly page: Page;
    private readonly equipmentExportForm: Locator;
    private readonly fileInput: Locator;
    private readonly selectAllEquipmentButton: Locator;
    private readonly exportButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.equipmentExportForm = page.getByText('Export equipment');
        this.fileInput = page.locator('//label[text()="* File name"]/following-sibling::input');
        this.selectAllEquipmentButton = page.locator('//div[text()="Equipment name"]/preceding-sibling::div//input[@role="checkbox"]');
        this.exportButton = page.locator('[class=\"btn-right-wrapper\"] button');
    }

    async exportAllEquipment(fileName: string) {
        await this.exportFile(fileName);
        await this.selectAllEquipmentButton.scrollIntoViewIfNeeded();
        await this.selectAllEquipmentButton.click({force: true});
        await this.exportButton.click();
    }

    async exportSelectedEquipment(fileName: string, equipmentList: string[]) {
        await this.exportFile(fileName);
        for (const item of equipmentList) {
            const selectBox = await this.getCheckboxLocator(item);
            await selectBox.click();
        }
        await this.exportButton.click();
    }

    private async exportFile(fileName: string) {
        await this.equipmentExportForm.waitFor({ state: 'visible' });
        await this.fileInput.fill(fileName);
    }

    private async getCheckboxLocator(equipmentName: string): Promise<Locator> {
        return this.page.locator(`//div[@class="checkbox-container"]/following-sibling::div[text()="${equipmentName}"]`);
    }
}