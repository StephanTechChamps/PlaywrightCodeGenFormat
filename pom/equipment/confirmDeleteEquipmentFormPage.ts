import {Locator, Page} from "@playwright/test";


export class ConfirmDeleteEquipmentFormPage {
    private readonly confirmPopup: Locator;
    private readonly formInnerText: Locator;
    private readonly confirmDeleteButton: Locator;

    constructor(page: Page) {
        this.confirmPopup = page.locator('[class="v-card v-sheet theme--light"]');
        this.formInnerText = page.getByText('Are you sure you want to remove this CHE from terminal database?');
        this.confirmDeleteButton = page.locator('//span[normalize-space(text())=\'Remove CHE\']/ancestor::button')
    }

   private async waitForConfirmPopupToAppear(): Promise<void> {
        await this.confirmPopup.waitFor({state: 'visible'});
    }

    async confirmDeleteEquipment(): Promise<void> {
        await this.waitForConfirmPopupToAppear();
        await this.formInnerText.waitFor({state: 'visible'});
        await this.confirmDeleteButton.waitFor({state: 'visible'});
        await this.confirmDeleteButton.click();
    }
}