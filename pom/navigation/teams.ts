import {expect, Locator, Page} from "@playwright/test";

export class Teams{
    readonly page:Page;
    readonly pageOverview: Locator;
    readonly equipmentAppButton:Locator;

    constructor(page:Page){
    this.page = page;
    this.pageOverview = page.locator("[class='tba-navbar-menu-items']")
    this.equipmentAppButton = page.locator('.action.ng-binding', { hasText: 'Equipment Management' });
    }

    async selectEquipmentApp(){
        await expect(this.pageOverview).toBeVisible();
        await this.equipmentAppButton.click();
    }
}