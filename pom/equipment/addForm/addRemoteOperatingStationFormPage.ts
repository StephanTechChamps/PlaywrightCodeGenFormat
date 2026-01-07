import {Page, Locator} from '@playwright/test';
import {Action} from "../../../enums/Action";
import {BaseFormPage} from "../../../helpers/equipment/BaseFormPage";
import {HomePage} from "../../navigation/homePage";

export class AddRemoteOperatingStationFormPage extends BaseFormPage {
    protected readonly saveButton: Locator;
    private readonly name: Locator;
    private readonly id: Locator;


    constructor(page: Page) {
        super(new HomePage(page));
        this.saveButton = page.locator('//span[text()=" Save "]/parent::button');
        this.name = page.locator('(//label[text()="* Name"]/following-sibling::input)[1]');
        this.id = page.locator('//label[text()="* ID"]/following-sibling::input');
    }

    async createRemoteOperatingStation(name: string, id: number,) {
        await this.openAndFillInCreationForm([
            {locator: this.name, action: Action.FILL, value: name},
            {locator: this.id, action: Action.FILL, value: id},
        ])
    }
}
