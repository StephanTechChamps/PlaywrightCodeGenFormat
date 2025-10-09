import {expect, Locator, Page} from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly createButton: Locator;
    readonly  selectInput: Locator;
    readonly closeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.createButton = page.locator('[class="tba-toolbar-icon-btn v-btn v-btn--icon v-btn--round v-btn--text theme--light v-size--default"]');
        this.selectInput = page.locator('input[id="input-222"]');
        this.closeButton = page.locator('[class="tba-icon-default tba-side-panel-close-button v-btn v-btn--icon v-btn--round theme--light v-size--default"]');
    }

    async createVehicle() {
        await this.createButton.click();
        await expect(this.closeButton).toBeVisible()
    }

    async insertInInputField( selectInput: Locator, value: string){
        await this.selectInput.click().then(async () => {
            await this.selectInput.fill(value);
        });
    }

    
}