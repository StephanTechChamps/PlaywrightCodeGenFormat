import {Page, Locator} from '@playwright/test';
import {HomePage} from "../navigation/homePage";
import {FieldSpec} from "../../interfaces/equipment/fieldspec";
import {Action} from "../../enums/Action";


export class AddAgvFormPage {
    private readonly saveButton: Locator;
    private readonly name: Locator;
    private readonly maxWeight: Locator;

    private readonly softwareVersion: Locator;
    private readonly hostName: Locator;
    private readonly portNumber: Locator;
    private readonly twentyFeetContainerOffset: Locator;
    private readonly homePage: HomePage;

    constructor(page: Page) {
        this.homePage = new HomePage(page);
        this.name = page.locator('(//label[text()="* Name"]/following-sibling::input)[1]');
        this.maxWeight = page.locator('//label[text()="* Max weight (kg)"]/following-sibling::input');
        this.softwareVersion = page.locator('//label[text()="* Software version"]/following-sibling::input');
        this.hostName = page.locator('//label[text()="* Host name"]/following-sibling::input');
        this.portNumber = page.locator('//label[text()="* Port number"]/following-sibling::input');
        this.twentyFeetContainerOffset = page.locator('//label[text()="* 20ft container offset (cm)"]/following-sibling::input');
        this.saveButton = page.locator('//span[text()=" Save "]/parent::button');

   }

    async createAGV(name: string, maxWeight: number, softwareVersion: string, hostName: string, portNumber: number, twentyFeetContainerOffset: number) {
        await this.openAndFillInCreationForm([
            {locator: this.name, action: Action.FILL, value: name},
            {locator: this.maxWeight, action: Action.FILL, value: maxWeight},
            {locator: this.softwareVersion, action: Action.FILL, value: softwareVersion},
            {locator: this.hostName, action: Action.FILL, value: hostName},
            {locator: this.portNumber, action: Action.FILL, value: portNumber},
            {locator: this.twentyFeetContainerOffset, action: Action.FILL, value: twentyFeetContainerOffset},
        ]);
    }

    private async interact(field: FieldSpec) {
        const {locator, action, value} = field;
        await locator.scrollIntoViewIfNeeded();

        switch (action) {
            case Action.FILL:
                if (value !== undefined) {
                    await locator.fill(String(value));
                }
                break;
            case Action.CLICK:
                await locator.click();
                break;
            default:
                throw new Error(`Unknown action: ${action}`);
        }
    }


    private async openAndFillInCreationForm(fields: FieldSpec[]): Promise<void> {
        await this.homePage.clickCreateVehicleButton();

        for (const field of fields) {
            await this.interact(field);
        }
        await this.saveButton.click();
    }
}
