import {Page} from "@playwright/test";
import {FieldSpec} from "../interfaces/equipment/fieldspec";
import {interact} from "./interact";
import {HomePage} from "../pom/navigation/homePage";

export async function openAndFillInCreationForm(page: Page, fields: FieldSpec[]) {
    this.saveButton = page.locator('//span[text()=" Save "]/parent::button');
    const homePage = new HomePage(page);

    await homePage.clickCreateVehicleButton();

    for (const field of fields) {
        await interact(field);
    }
    await this.saveButton.click();
}