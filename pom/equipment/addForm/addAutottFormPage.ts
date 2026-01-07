import {Page, Locator} from '@playwright/test';
import {HomePage} from "../../navigation/homePage";
import {Action} from "../../../enums/Action";
import {BaseFormPage} from "../../../helpers/equipment/BaseFormPage";


export class AddAutottFormPage extends BaseFormPage{
    protected readonly saveButton: Locator;
    private readonly name: Locator;
    private readonly maxWeight: Locator;
    private readonly provider: Locator;
    private readonly url: Locator;

    constructor(page: Page) {
        super(new HomePage(page));
        this.saveButton = page.locator('//span[text()=" Save "]/parent::button');
        this.name = page.locator('(//label[text()="* Name"]/following-sibling::input)[1]');
        this.maxWeight = page.locator('//label[text()="* Max weight (kg)"]/following-sibling::input');
        this.provider = page.locator('//label[text()="* Provider"]/following-sibling::input');
        this.url = page.locator('//label[text()="* Url"]/following-sibling::input');
   }

    async createAutoTT(name: string, maxWeight: number, provider: string, url: string) {
        await this.openAndFillInCreationForm([
            {locator: this.name, action: Action.FILL, value: name},
            {locator: this.maxWeight, action: Action.FILL, value: maxWeight},
            {locator: this.provider, action: Action.FILL, value: provider},
            {locator: this.url, action: Action.FILL, value: url},
        ]);
    }
}
