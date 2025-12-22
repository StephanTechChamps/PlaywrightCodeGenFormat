import {Page, Locator} from '@playwright/test';
import {Action} from "../../../enums/Action";
import {BaseFormPage} from "../../../helpers/equipment/BaseFormPage";
import {HomePage} from "../../navigation/homePage";
// @ts-ignore
import {EditARMGEquipmentOptions} from '../../../interfaces/equipment/edit/EditARMGEquipmentOptions'

export class EditArmgFormPage extends BaseFormPage {
    private readonly name: Locator;
    private readonly maxWeight: Locator;
    private readonly softwareVersion: Locator;
    private readonly hostName: Locator;
    private readonly portNumber: Locator;
    private readonly craneId: Locator;
    private readonly maxTierHeight: Locator;
    protected readonly saveButton: Locator;

    constructor(page: Page) {
        super(new HomePage(page));
        this.name = page.locator('(//label[text()="* Name"]/following-sibling::input)[1]');
        this.maxWeight = page.locator('//label[text()="* Max weight (kg)"]/following-sibling::input');

        this.softwareVersion = page.locator('//label[text()="* Software version"]/following-sibling::input');
        this.hostName = page.locator('//label[text()="* Host name"]/following-sibling::input');
        this.portNumber = page.locator('//label[text()="* Port number"]/following-sibling::input');

        this.craneId = page.locator('//label[text()="* Crane id"]/following-sibling::input');
        this.maxTierHeight = page.locator('//label[text()="* Max tier height"]/following-sibling::input');
        this.saveButton = page.locator('//span[text()=" Save "]/parent::button');
    }

    async editEquipment(options: EditARMGEquipmentOptions) {
        await this.openAndFillInCreationForm(
            [
                {locator: this.name, value: options.name},
                {locator: this.maxWeight, value: options.maxWeight},
                {locator: this.craneId, value: options.craneId},
                {locator: this.maxTierHeight, value: options.maxTierHeight},
                {locator: this.softwareVersion, value: options.softwareVersion},
                {locator: this.hostName, value: options.hostName},
                {locator: this.portNumber, value: options.portNumber},
            ].filter(f => f.value !== undefined)
                .map(f => ({...f, action: Action.FILL}))
        );
    }
}
