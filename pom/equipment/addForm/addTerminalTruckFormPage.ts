import {Page, Locator} from '@playwright/test';
import {Action} from "../../../enums/Action";
import {BaseFormPage} from "../../../helpers/equipment/BaseFormPage";
import {HomePage} from "../../navigation/homePage";

export class AddTerminalTruckFormPage extends BaseFormPage {
    protected readonly saveButton: Locator;
    private readonly name: Locator;
    private readonly maxWeight: Locator;
    private readonly softwareVersion: Locator;
    private readonly orientation: Locator;
    private readonly coordinateX: Locator;
    private readonly coordinateY: Locator;

    constructor(page: Page) {
        super(new HomePage(page));
        this.saveButton = page.locator('//span[text()=" Save "]/parent::button');
        this.name = page.locator('//label[text()="* Name"]/following-sibling::input');
        this.maxWeight = page.locator('//label[text()="* Max weight (kg)"]/following-sibling::input');
        this.softwareVersion = page.locator('//label[text()="* Software version"]/following-sibling::input');
        this.coordinateX = page.locator('//label[text()="* X coordinate"]/following-sibling::input');
        this.coordinateY = page.locator('//label[text()="* Y coordinate"]/following-sibling::input');
        this.orientation = page.locator('//label[text()="* Orientation (degrees)"]/following-sibling::input');
    }

    async createTerminalTruck(name: string, maxWeight: number, softwareVersion: string, coordinateX: number, coordinateY: number, orientation: number) {
        await this.openAndFillInCreationForm([
            {locator: this.name, action: Action.FILL, value: name},
            {locator: this.maxWeight, action: Action.FILL, value: maxWeight},
            {locator: this.softwareVersion, action: Action.FILL, value: softwareVersion},
            {locator: this.coordinateX, action: Action.FILL, value: coordinateX},
            {locator: this.coordinateY, action: Action.FILL, value: coordinateY},
            {locator: this.orientation, action: Action.FILL, value: orientation},
        ]);
    }
}
