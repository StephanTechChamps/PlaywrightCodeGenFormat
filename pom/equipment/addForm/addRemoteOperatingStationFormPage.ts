import {Page, Locator} from '@playwright/test';
import {Action} from "../../../enums/Action";
import {BaseFormPage} from "../../../helpers/equipment/BaseFormPage";
import {HomePage} from "../../navigation/homePage";

export class AddRemoteOperatingStationFormPage extends BaseFormPage{
    protected readonly saveButton: Locator;
    private readonly name: Locator;
    private readonly id: Locator;
    private readonly softwareVersion: Locator;
    private readonly hostName: Locator;
    private readonly portNumber: Locator;
    private readonly craneId: Locator;
    private readonly maxTierHeight: Locator;
    private readonly stackProfilingPort: Locator;

    constructor(page: Page) {
        super(new HomePage(page));
        this.name = page.locator('(//label[text()="* Name"]/following-sibling::input)[1]');
        this.id = page.locator('//label[text()="* ID"]/following-sibling::input');

        this.softwareVersion = page.locator('//label[text()="* Software version"]/following-sibling::input');
        this.hostName = page.locator('//label[text()="* Host name"]/following-sibling::input');
        this.portNumber = page.locator('//label[text()="* Port number"]/following-sibling::input');

        this.craneId = page.locator('//label[text()="* Crane id"]/following-sibling::input');
        this.maxTierHeight = page.locator('//label[text()="* Max tier height"]/following-sibling::input');
        this.stackProfilingPort = page.locator('//label[text()="* Stack Profiling Port"]/following-sibling::input');
   }

   async createRemoteOperatingStation(name: string, id: number, type: number, allowedOperations: string,
                    hostName: string, portNumber: number) {
        await this.openAndFillInCreationForm([
            {locator: this.name, action: Action.FILL, value: name},
            {locator: this.id, action: Action.FILL, value: id},

            {locator: this.hostName, action: Action.FILL, value: hostName},
            {locator: this.portNumber, action: Action.FILL, value: portNumber}
        ])
    }
}
