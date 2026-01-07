import {Page, Locator} from '@playwright/test';
import {HomePage} from "../../navigation/homePage";
import {Action} from "../../../enums/Action";
import {BaseFormPage} from "../../../helpers/equipment/BaseFormPage";


export class AddQCFormPage extends BaseFormPage{
    protected readonly saveButton: Locator;
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

    constructor(page: Page) {
        super(new HomePage(page));
        this.saveButton = page.locator('//span[text()=" Save "]/parent::button');
        this.name = page.locator('(//label[text()="* Name"]/following-sibling::input)[1]');
        this.maxWeight = page.locator('//label[text()="* Max weight (kg)"]/following-sibling::input');
        this.softwareVersion = page.locator('//label[text()="* Software version"]/following-sibling::input');
        this.availableLocationOnPlatform = page.locator('//label[text()="* Available locations on platform"]/following-sibling::input');
        this.berth = page.locator('//label[text()="* Berth"]/following-sibling::div//input');
        this.topologyIndex = page.locator('//label[text()="* Topology index"]/following-sibling::input');
        this.provider = page.locator('//label[text()="* Provider"]/following-sibling::input');
        this.url = page.locator('//label[text()="* Url"]/following-sibling::input');
        this.berthOption = page.locator('[class="tba-select__item"]');
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
}
