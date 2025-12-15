import {Page, Locator} from '@playwright/test';
import {HomePage} from "../navigation/homePage";
import {FieldSpec} from "../../interfaces/equipment/fieldspec";
import {Action} from "../../enums/Action";


export class AddQCFormPage {
    private readonly saveButton: Locator;
    private readonly name: Locator;
    private readonly maxWeight: Locator;
    private readonly softwareVersion: Locator;
    private readonly availableLocationOnPlatform: Locator;
    private readonly berth: Locator;
    private readonly berthOption: Locator;
    private readonly topologyIndex: Locator;
    private readonly provider: Locator;
    private readonly url: Locator;
    private readonly laneName: Locator;
    private readonly laneDistanceToQuay: Locator
    private readonly lanedTPlow: Locator
    private readonly lanedTPCenter: Locator
    private readonly lanedTPHighBollard: Locator
    private readonly homePage: HomePage;

    constructor(page: Page) {
        // this.page = page;
        this.homePage = new HomePage(page);
        this.name = page.locator('(//label[text()="* Name"]/following-sibling::input)[1]');
        this.maxWeight = page.locator('//label[text()="* Max weight (kg)"]/following-sibling::input');
        this.softwareVersion = page.locator('//label[text()="* Software version"]/following-sibling::input');
        this.availableLocationOnPlatform = page.locator('//label[text()="* Available locations on platform"]/following-sibling::input');
        this.berth = page.locator('//label[text()="* Berth"]/following-sibling::div//input');
        this.topologyIndex = page.locator('//label[text()="* Topology index"]/following-sibling::input');
        this.provider = page.locator('//label[text()="* Provider"]/following-sibling::input');
        this.url = page.locator('//label[text()="* Url"]/following-sibling::input');
        this.berthOption = page.locator('[class="tba-select__item"]');
        this.saveButton = page.locator('//span[text()=" Save "]/parent::button');
        this.laneName = page.locator('(//label[text()="* Name"]/following-sibling::input)[2]');
        this.laneDistanceToQuay = page.locator('//label[text()="* Distance to quay (cm)"]/following-sibling::input');
        this.lanedTPlow = page.locator('//label[text()="* Transfer point (Low bollard)"]/following-sibling::input');
        this.lanedTPCenter = page.locator('//label[text()="* Transfer point (Center)"]/following-sibling::input');
        this.lanedTPHighBollard = page.locator('//label[text()="* Transfer point (High bollard)"]/following-sibling::input');
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
            {locator: this.laneDistanceToQuay, action: Action.FILL, value: distanceToQ},
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
