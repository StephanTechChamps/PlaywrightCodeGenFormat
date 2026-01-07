import {Page, Locator} from '@playwright/test';
import {HomePage} from "../../navigation/homePage";
import {Action} from "../../../enums/Action";
import {BaseFormPage} from "../../../helpers/equipment/BaseFormPage";

export class AddAgvFormPage extends BaseFormPage {
    protected readonly saveButton: Locator;
    private readonly name: Locator;
    private readonly maxWeight: Locator;
    private readonly softwareVersion: Locator;
    private readonly hostName: Locator;
    private readonly portNumber: Locator;
    private readonly twentyFeetContainerOffset: Locator;

    constructor(page: Page) {
        super(new HomePage(page));
        this.saveButton = page.locator('//span[text()=" Save "]/parent::button');
        this.name = page.locator('(//label[text()="* Name"]/following-sibling::input)[1]');
        this.maxWeight = page.locator('//label[text()="* Max weight (kg)"]/following-sibling::input');
        this.softwareVersion = page.locator('//label[text()="* Software version"]/following-sibling::input');
        this.hostName = page.locator('//label[text()="* Host name"]/following-sibling::input');
        this.portNumber = page.locator('//label[text()="* Port number"]/following-sibling::input');
        this.twentyFeetContainerOffset = page.locator('//label[text()="* 20ft container offset (cm)"]/following-sibling::input');
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
}
