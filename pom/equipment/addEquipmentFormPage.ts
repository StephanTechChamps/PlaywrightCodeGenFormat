import {Page, Locator} from '@playwright/test';
import {HomePage} from "../navigation/homePage";
import {FieldSpec} from "../../interfaces/equipment/fieldspec";
import {Action} from "../../enums/Action";


export class AddEquipmentFormPage {
    private readonly saveButton: Locator;
    private readonly name: Locator;
    private readonly maxWeight: Locator;

    private readonly softwareVersion: Locator;
    private readonly hostName: Locator;
    private readonly portNumber: Locator;

    private readonly craneId: Locator;
    private readonly maxTierHeight: Locator;
    private readonly stackProfilingPort: Locator;
    private readonly homePage: HomePage;

    constructor(page: Page) {
        // this.page = page;
        this.homePage = new HomePage(page);
        this.name = page.locator('(//label[text()="* Name"]/following-sibling::input)[1]');
        this.maxWeight = page.locator('//label[text()="* Max weight (kg)"]/following-sibling::input');

        this.softwareVersion = page.locator('//label[text()="* Software version"]/following-sibling::input');
        this.hostName = page.locator('//label[text()="* Host name"]/following-sibling::input');
        this.portNumber = page.locator('//label[text()="* Port number"]/following-sibling::input');

        this.craneId = page.locator('//label[text()="* Crane id"]/following-sibling::input');
        this.maxTierHeight = page.locator('//label[text()="* Max tier height"]/following-sibling::input');
        this.stackProfilingPort = page.locator('//label[text()="* Stack Profiling Port"]/following-sibling::input');
   }

    async createARTG(name: string, maxWeight: number, craneId: number, maxTierHeight: number, softwareVersion: string,
                     hostName: string, portNumber: number, stackProfilingPort: number) {
        await this.openAndFillInCreationForm([
            {locator: this.name, action: Action.FILL, value: name},
            {locator: this.craneId, action: Action.FILL, value: craneId},
            {locator: this.maxWeight, action: Action.FILL, value: maxWeight},
            {locator: this.maxTierHeight, action: Action.FILL, value: maxTierHeight},
            {locator: this.softwareVersion, action: Action.FILL, value: softwareVersion},
            {locator: this.hostName, action: Action.FILL, value: hostName},
            {locator: this.portNumber, action: Action.FILL, value: portNumber},
            {locator: this.stackProfilingPort, action: Action.FILL, value: stackProfilingPort},
            // [this.name, name],
            // [this.craneId, craneId],
            // [this.maxWeight, maxWeight],
            // [this.maxTierHeight, maxTierHeight],
            // [this.softwareVersion, softwareVersion],
            // [this.hostName, hostName],
            // [this.portNumber, portNumber],
            // [this.stackProfilingPort, portNumber],
        ]);
    }

    //
    async createARMG(name: string, maxWeight: number, craneId: number, maxTierHeight: number, softwareVersion: string,
                     hostName: string, portNumber: number) {
        await this.openAndFillInCreationForm([
            {locator: this.name, action: Action.FILL, value: name},
            {locator: this.craneId, action: Action.FILL, value: craneId},
            {locator: this.maxWeight, action: Action.FILL, value: maxWeight},
            {locator: this.maxTierHeight, action: Action.FILL, value: maxTierHeight},
            {locator: this.softwareVersion, action: Action.FILL, value: softwareVersion},
            {locator: this.hostName, action: Action.FILL, value: hostName},
            {locator: this.portNumber, action: Action.FILL, value: portNumber},
            // [this.name, name],
            // [this.craneId, craneId],
            // [this.maxWeight, maxWeight],
            // [this.maxTierHeight, maxTierHeight],
            // [this.softwareVersion, softwareVersion],
            // [this.hostName, hostName],
            // [this.portNumber, portNumber],
        ]);
    }


    async createASTRAD(name: string, maxWeight: number, maxTierHeight: number, softwareVersion: string,
                       hostName: string, portNumber: number) {
        await this.openAndFillInCreationForm([
            {locator: this.name, action: Action.FILL, value: name},
            {locator: this.maxWeight, action: Action.FILL, value: maxWeight},
            {locator: this.maxTierHeight, action: Action.FILL, value: maxTierHeight},
            {locator: this.softwareVersion, action: Action.FILL, value: softwareVersion},
            {locator: this.hostName, action: Action.FILL, value: hostName},
            {locator: this.portNumber, action: Action.FILL, value: portNumber},
            // [this.name, name],
            // [this.maxWeight, maxWeight],
            // [this.maxTierHeight, maxTierHeight],
            // [this.softwareVersion, softwareVersion],
            // [this.hostName, hostName],
            // [this.portNumber, portNumber],
        ]);
    }

    async createMSC(name: string, maxWeight: number, maxTierHeight: number, softwareVersion: string,
                    hostName: string, portNumber: number) {
        await this.openAndFillInCreationForm([
            {locator: this.name, action: Action.FILL, value: name},
            {locator: this.maxWeight, action: Action.FILL, value: maxWeight},
            {locator: this.maxTierHeight, action: Action.FILL, value: maxTierHeight},
            {locator: this.softwareVersion, action: Action.FILL, value: softwareVersion},
            {locator: this.hostName, action: Action.FILL, value: hostName},
            {locator: this.portNumber, action: Action.FILL, value: portNumber}
        ])
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
