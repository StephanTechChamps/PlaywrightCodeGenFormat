import {Page, Locator} from '@playwright/test';
import {HomePage} from "../navigation/homePage";
import {FieldSpec} from "../../interfaces/equipment/fieldspec";
import {Action} from "../../enums/Action";


export class AddEquipmentFormPage {
    // private readonly page: Page;
    private readonly saveButton: Locator;
    private readonly name: Locator;
    private readonly maxWeight: Locator;
    // private readonly chassisSpecificationWOTR: Locator;
    // private readonly chassisSpecificationWTR: Locator;
    // private readonly liftCapabilitySingle: Locator;
    // private readonly liftCapabilityTwin: Locator;
    // private readonly maxTwinHeightDiff: Locator;
    private readonly softwareVersion: Locator;
    private readonly hostName: Locator;
    private readonly portNumber: Locator;
    private readonly twentyFeetContainerOffset: Locator;
    // private readonly subTypeSCKT: Locator;
    // private readonly subTypeBAGV: Locator;
    // private readonly protocolTypeNSc: Locator;
    // private readonly protocolTypeNGEN2: Locator;
    // private readonly energySourceTypeFuel: Locator;
    // private readonly energySourceTypeBattery: Locator;
    // private readonly boundary: Locator;
    private readonly craneId: Locator;
    private readonly maxTierHeight: Locator;
    private readonly stackProfilingPort: Locator;
    // private readonly liftCapabilityTandem: Locator;
    private readonly availableLocationOnPlatform: Locator;
    private readonly berth: Locator;
    private readonly berthOption: Locator;
    private readonly topologyIndex: Locator;
    private readonly provider: Locator;
    private readonly url: Locator;
    private readonly laneName: Locator;
    private readonly laneDistanceToQauy
    private readonly lanedTPlow
    private readonly lanedTPCenter
    private readonly lanedTPHighBollard
    private readonly homePage: HomePage;

    constructor(page: Page) {
        // this.page = page;
        this.homePage = new HomePage(page);
        this.name = page.locator('(//label[text()="* Name"]/following-sibling::input)[1]');
        this.maxWeight = page.locator('//label[text()="* Max weight (kg)"]/following-sibling::input');
        // this.chassisSpecificationWOTR = page.locator('button[value="WITHOUT_TRAILER_RACK"]');
        // this.chassisSpecificationWTR = page.locator('button[value="WITH_TRAILER_RACK"]');
        // this.liftCapabilitySingle = page.locator('button[value="SINGLE"]');
        // this.liftCapabilityTwin = page.locator('button[value="TWIN"]');
        // this.liftCapabilityTandem = page.locator('button[value="TANDEM"]');
        // this.maxTwinHeightDiff = page.locator('//label[text()="Max twin weight diff (kg)"]/following-sibling::input');
        this.softwareVersion = page.locator('//label[text()="* Software version"]/following-sibling::input');
        this.hostName = page.locator('//label[text()="* Host name"]/following-sibling::input');
        this.portNumber = page.locator('//label[text()="* Port number"]/following-sibling::input');
        this.twentyFeetContainerOffset = page.locator('//label[text()="* 20ft container offset (cm)"]/following-sibling::input');
        // this.subTypeSCKT = page.locator('button[value="SC_KT"]');
        // this.subTypeBAGV = page.locator('button[value="BAGV"]');
        // this.protocolTypeNSc = page.locator('button[value="NavimaticSc"]');
        // this.protocolTypeNGEN2 = page.locator('button[value="NavimaticGen2"]');
        // this.energySourceTypeFuel = page.locator('button[value="FUEL"]');
        // this.energySourceTypeBattery = page.locator('button[value="BATTERY"]');
        // this.boundary = page.locator('//label[text()="Boundary"]/following-sibling::input');
        this.craneId = page.locator('//label[text()="* Crane id"]/following-sibling::input');
        this.maxTierHeight = page.locator('//label[text()="* Max tier height"]/following-sibling::input');
        this.stackProfilingPort = page.locator('//label[text()="* Stack Profiling Port"]/following-sibling::input');
        this.availableLocationOnPlatform = page.locator('//label[text()="* Available locations on platform"]/following-sibling::input');
        this.berth = page.locator('//label[text()="* Berth"]/following-sibling::div//input');
        this.topologyIndex = page.locator('//label[text()="* Topology index"]/following-sibling::input');
        this.provider = page.locator('//label[text()="* Provider"]/following-sibling::input');
        this.url = page.locator('//label[text()="* Url"]/following-sibling::input');
        this.berthOption = page.locator('[class="tba-select__item"]');
        this.saveButton = page.locator('//span[text()=" Save "]/parent::button');
        this.laneName = page.locator('(//label[text()="* Name"]/following-sibling::input)[2]');
        this.laneDistanceToQauy = page.locator('//label[text()="* Distance to quay (cm)"]/following-sibling::input');
        this.lanedTPlow = page.locator('//label[text()="* Transfer point (Low bollard)"]/following-sibling::input');
        this.lanedTPCenter = page.locator('//label[text()="* Transfer point (Center)"]/following-sibling::input');
        this.lanedTPHighBollard = page.locator('//label[text()="* Transfer point (High bollard)"]/following-sibling::input');

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

    //
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
            { locator: this.name, action: Action.FILL, value: name },
            { locator: this.maxWeight, action: Action.FILL, value: maxWeight },
            { locator: this.maxTierHeight, action: Action.FILL, value: maxTierHeight },
            { locator: this.softwareVersion, action: Action.FILL, value: softwareVersion },
            { locator: this.hostName, action: Action.FILL, value: hostName },
            { locator: this.portNumber, action: Action.FILL, value: portNumber },
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

    async createQC(name: string, maxWeight: number, availableLocationOnPlatform: number, laneName: string, distanceToQ: number,
                   transferPointL: string, transferPointCenter: string, transferPointH: string, topologyIndex: number,
                   softwareVersion: string, provider: string,
                   url: string) {
        await this.openAndFillInCreationForm([
            {locator: this.name, action: Action.FILL, value: name},
            {locator: this.maxWeight, action: Action.FILL, value: maxWeight},
            {locator: this.availableLocationOnPlatform, action: Action.FILL, value: availableLocationOnPlatform},
            {locator: this.berth, action: Action.CLICK},
            {locator: this.berthOption, action: Action.CLICK},
            {locator: this.laneName, action: Action.FILL, value: laneName},
            {locator: this.laneDistanceToQauy, action: Action.FILL, value: distanceToQ},
            {locator: this.lanedTPlow, action: Action.FILL, value: transferPointL},
            {locator: this.lanedTPCenter, action: Action.FILL, value: transferPointCenter},
            {locator: this.lanedTPHighBollard, action: Action.FILL, value: transferPointH},
            {locator: this.topologyIndex, action: Action.FILL, value: topologyIndex},
            {locator: this.softwareVersion, action: Action.FILL, value: softwareVersion},
            {locator: this.provider, action: Action.FILL, value: provider},
            {locator: this.url, action: Action.FILL, value: url},
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
