import {Page, Locator} from '@playwright/test';
import {HomePage} from "../../navigation/homePage";
import {Action} from "../../../enums/Action";
import {BaseFormPage} from "../../../helpers/equipment/BaseFormPage";

export class EditAcsFormPage extends BaseFormPage {
    protected readonly saveButton: Locator;
    private readonly acsName: Locator;
    private readonly prefix: Locator;
    private readonly orientation: Locator;
    private readonly associatedLocationName: Locator;
    private readonly locationOrientation: Locator;
    private readonly coordinateX: Locator;
    private readonly coordinateY: Locator;
    private readonly dimensionsLength: Locator;
    private readonly dimensionsWidth: Locator;
    private readonly locationCoordinatesX: Locator;
    private readonly locationCoordinatesY: Locator;
    private readonly locationDimensionsLength: Locator;
    private readonly locationDimensionsWidth: Locator;
    private readonly closeFormButton: Locator;

    constructor(page: Page) {
        super(new HomePage(page));
        this.saveButton = page.locator('//span[text()=" Save "]/parent::button');
        this.acsName = page.locator('//label[text()="* Name"]/following-sibling::input');
        this.prefix = page.locator('//label[text()="* Prefix"]/following-sibling::input');
        this.orientation = page.locator('//label[text()="* Orientation (milli degrees)"]/following-sibling::input');
        this.associatedLocationName = page.locator('//label[text()="* Associated location name"]/following-sibling::input');
        this.locationOrientation = page.locator('//label[text()="* Location orientation (milli degrees)"]/following-sibling::input');

        this.coordinateX = page.locator('(//div[normalize-space(text())="Coordinates (X, Y)"]/following-sibling::div[1]//input)[1]');
        this.coordinateY = page.locator('(//div[normalize-space(text())="Coordinates (X, Y)"]/following-sibling::div[1]//input)[2]');

        this.dimensionsLength = page.locator('(//div[normalize-space(text())="Dimensions (length, width)"]/following-sibling::div[1]//input)[1]');
        this.dimensionsWidth = page.locator('(//div[normalize-space(text())="Dimensions (length, width)"]/following-sibling::div[1]//input)[2]');

        this.locationCoordinatesX = page.locator('(//div[normalize-space(text())="Location coordinates (X, Y)"]/following-sibling::div[1]//input)[1]');
        this.locationCoordinatesY = page.locator('(//div[normalize-space(text())="Location coordinates (X, Y)"]/following-sibling::div[1]//input)[2]');
        this.locationDimensionsLength = page.locator('(//div[normalize-space(text())="Location dimensions (length, width)"]/following-sibling::div[1]//input)[1]');
        this.locationDimensionsWidth = page.locator('(//div[normalize-space(text())="Location dimensions (length, width)"]/following-sibling::div[1]//input)[2]');
        this.closeFormButton = page.locator('button[class="tba-icon-default tba-side-panel-close-button v-btn v-btn--icon v-btn--round theme--light v-size--default"]');

    }

    async editACS(acsName: string, prefix: string, coordinatesX: number, coordinatesY: number, dimensionsLength: number, dimensionsWidth: number, orientation: number,
                  associatedLocationName: string, locationCoordinatesX: number, locationCoordinatesY: number, locationDimensionLength: number, locationDimensionWidth: number,
                  locationOrientation: number) {
        await this.openAndFillInEditForm([
            {locator: this.acsName, action: Action.FILL, value: acsName},
            {locator: this.prefix, action: Action.FILL, value: prefix},
            {locator: this.coordinateX, action: Action.FILL, value: coordinatesX},
            {locator: this.coordinateY, action: Action.FILL, value: coordinatesY},
            {locator: this.dimensionsLength, action: Action.FILL, value: dimensionsLength},
            {locator: this.dimensionsWidth, action: Action.FILL, value: dimensionsWidth},
            {locator: this.orientation, action: Action.FILL, value: orientation},
            {locator: this.associatedLocationName, action: Action.FILL, value: associatedLocationName},
            {locator: this.locationCoordinatesX, action: Action.FILL, value: locationCoordinatesX},
            {locator: this.locationCoordinatesY, action: Action.FILL, value: locationCoordinatesY},
            {locator: this.locationDimensionsLength, action: Action.FILL, value: locationDimensionLength},
            {locator: this.locationDimensionsWidth, action: Action.FILL, value: locationDimensionWidth},
            {locator: this.locationOrientation, action: Action.FILL, value: locationOrientation},
        ]);
    }

    async closeEditForm() {
        await this.closeFormButton.click();
    }
}

