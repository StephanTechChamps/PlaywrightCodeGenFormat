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

    async openApplicationApp() {
     await  this.page.goto("https://teamssrvse01.de.ad.tba.nl:9303/")
    }

    async selectEquipmentApp(){
        await expect(this.pageOverview).toBeVisible();
        await this.equipmentAppButton.click();
    }


}