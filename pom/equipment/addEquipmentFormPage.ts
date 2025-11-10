import {Page, Locator} from '@playwright/test';
import {HomePage} from "../navigation/homePage";


export class AddEquipmentFormPage {
    readonly page: Page;
    readonly saveButton: Locator;
    readonly name: Locator;
    readonly maxWeight: Locator;
    readonly chassisSpecificationWOTR: Locator;
    readonly chassisSpecificationWTR: Locator;
    readonly liftCapabilitySingle: Locator;
    readonly liftCapabilityTwin: Locator;
    readonly maxTwinHeightDiff: Locator;
    readonly softwareVersion: Locator;
    readonly hostName: Locator;
    readonly portNumber: Locator;
    readonly twentyFeetContainerOffset: Locator;
    readonly subTypeSCKT: Locator;
    readonly subTypeBAGV: Locator;
    readonly protocolTypeNSc: Locator;
    readonly protocolTypeNGEN2: Locator;
    readonly energySourceTypeFuel: Locator;
    readonly energySourceTypeBattery: Locator;
    readonly boundary: Locator;
    readonly craneId: Locator;
    readonly maxTierHeight: Locator;
    readonly stackProfilingPort: Locator;
    readonly liftCapabilityTandem: Locator;
    readonly availableLocationOnPlatform: Locator;
    readonly berth: Locator;
    readonly berthOption: Locator;
    private homePage: HomePage;

    constructor(page: Page) {
        this.page = page;
        this.homePage = new HomePage(page);
        this.name = page.locator('(//label[text()="* Name"]/following-sibling::input)[1]');
        this.maxWeight = page.locator('//label[text()="* Max weight (kg)"]/following-sibling::input');
        this.chassisSpecificationWOTR = page.locator('button[value="WITHOUT_TRAILER_RACK"]');
        this.chassisSpecificationWTR = page.locator('button[value="WITH_TRAILER_RACK"]');
        this.liftCapabilitySingle = page.locator('button[value="SINGLE"]');
        this.liftCapabilityTwin = page.locator('button[value="TWIN"]');
        this.liftCapabilityTandem = page.locator('button[value="TANDEM"]');
        this.maxTwinHeightDiff = page.locator('//label[text()="Max twin weight diff (kg)"]/following-sibling::input');
        this.softwareVersion = page.locator('//label[text()="* Software version"]/following-sibling::input');
        this.hostName = page.locator('//label[text()="* Host name"]/following-sibling::input');
        this.portNumber = page.locator('//label[text()="* Port number"]/following-sibling::input');
        this.twentyFeetContainerOffset = page.locator('//label[text()="* 20ft container offset (cm)"]/following-sibling::input');
        this.subTypeSCKT = page.locator('button[value="SC_KT"]');
        this.subTypeBAGV = page.locator('button[value="BAGV"]');
        this.protocolTypeNSc = page.locator('button[value="NavimaticSc"]');
        this.protocolTypeNGEN2 = page.locator('button[value="NavimaticGen2"]');
        this.energySourceTypeFuel = page.locator('button[value="FUEL"]');
        this.energySourceTypeBattery = page.locator('button[value="BATTERY"]');
        this.boundary = page.locator('//label[text()="Boundary"]/following-sibling::input');
        this.craneId = page.locator('//label[text()="* Crane id"]/following-sibling::input');
        this.maxTierHeight = page.locator('//label[text()="* Max tier height"]/following-sibling::input');
        this.stackProfilingPort = page.locator('//label[text()="* Stack Profiling Port"]/following-sibling::input');
        this.availableLocationOnPlatform = page.locator('//label[text()="* Available locations on platform"]/following-sibling::input');
        this.berth = page.locator('//label[text()="* Berth"]/following-sibling::input');
        this.berthOption = page.locator('[class="tba-select__item"]');
        this.saveButton = page.locator('[class="v-card__actions side-operation-panel-buttons"] button');
    }

    async createAGV(name: string, maxWeight: number, softwareVersion: string, hostName: string, portNumber: number, twentyFeetContainerOffset: number) {
        await this.openAndFillInCreationForm([
            [this.name, name],
            [this.maxWeight, maxWeight],
            [this.softwareVersion, softwareVersion],
            [this.hostName, hostName],
            [this.portNumber, portNumber],
            [this.twentyFeetContainerOffset, twentyFeetContainerOffset],
        ]);
    }

    async createARTG(name: string, maxWeight: number, craneId: number, maxTierHeight: number, softwareVersion: string,
                     hostName: string, portNumber: number) {
        await this.openAndFillInCreationForm([
            [this.name, name],
            [this.craneId, craneId],
            [this.maxWeight, maxWeight],
            [this.maxTierHeight, maxTierHeight],
            [this.softwareVersion, softwareVersion],
            [this.hostName, hostName],
            [this.portNumber, portNumber],
            [this.stackProfilingPort, portNumber],
        ]);
    }

    async createARMG(name: string, maxWeight: number, craneId: number, maxTierHeight: number, softwareVersion: string,
                     hostName: string, portNumber: number) {
        await this.openAndFillInCreationForm([
            [this.name, name],
            [this.craneId, craneId],
            [this.maxWeight, maxWeight],
            [this.maxTierHeight, maxTierHeight],
            [this.softwareVersion, softwareVersion],
            [this.hostName, hostName],
            [this.portNumber, portNumber],
        ]);
    }

    async createASTRAD(name: string, maxWeight: number, maxTierHeight: number, softwareVersion: string,
                       hostName: string, portNumber: number) {
        await this.openAndFillInCreationForm([
            [this.name, name],
            [this.maxWeight, maxWeight],
            [this.maxTierHeight, maxTierHeight],
            [this.softwareVersion, softwareVersion],
            [this.hostName, hostName],
            [this.portNumber, portNumber],
        ]);
    }

    async createMSC(name: string, maxWeight: number, maxTierHeight: number, softwareVersion: string,
                    hostName: string, portNumber: number) {
        await this.openAndFillInCreationForm([
            [this.name, name],
            [this.maxWeight, maxWeight],
            [this.maxTierHeight, maxTierHeight],
            [this.softwareVersion, softwareVersion],
            [this.hostName, hostName],
            [this.portNumber, portNumber],
        ]);
    }

    async createQC(name: string, maxWeight: number, softwareVersion: string,
                   hostName: string, portNumber: number, availableLocationOnPlatform: number) {
        await this.openAndFillInCreationForm([
            [this.name, name],
            [this.maxWeight, maxWeight],
            [this.availableLocationOnPlatform, availableLocationOnPlatform],
            [this.softwareVersion, softwareVersion],
            [this.hostName, hostName],
            [this.portNumber, portNumber],
        ]);
    }

    private async fillField(locator: Locator, value: string | number) {
        await locator.fill(value.toString());
    }

    private async openAndFillInCreationForm(pairs: [Locator, string | number][]) {
        await this.homePage.clickCreateVehicleButton();
        for (const [locator, value] of pairs) {
            await this.fillField(locator, value);
        }
        await this.saveButton.click();
    }
}
