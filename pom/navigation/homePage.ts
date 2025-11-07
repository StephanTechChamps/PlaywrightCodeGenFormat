import {expect, Locator, Page} from '@playwright/test';
import {VehicleType} from "../../fixtures/vehicleType";

export class HomePage {
    readonly page: Page;
    readonly createButton: Locator;
    readonly  selectInput: Locator;
    readonly closeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.createButton = page.locator('[class="tba-toolbar-icon-btn v-btn v-btn--icon v-btn--round v-btn--text theme--light v-size--default"]');
        this.selectInput = page.locator('input[placeholder="Equipment name"]');
        this.closeButton = page.locator('[class="tba-icon-default tba-side-panel-close-button v-btn v-btn--icon v-btn--round theme--light v-size--default"]');
    }

    getVehicleLocator(type: VehicleType): Locator {
        return this.page.locator(`[data-cy="${type}"]`);
    }

    async selectVehicleType(vehicleType: VehicleType ) {
        await this.getVehicleLocator(vehicleType).click();
    }

    async clickCreateVehicleButton() {
        await this.createButton.click();
        await expect(this.closeButton).toBeVisible()
        // await equipmentFormPage.name.fill(name);
        // await equipmentFormPage.maxWeight.fill(maxWeight.toString());
        // await equipmentFormPage.chassisSpecificationWOTR.click();
        // await equipmentFormPage.liftCapabilitySINGLE.click();
        // await equipmentFormPage.maxTwinHeightDiff.fill(maxTwinHeightDiff.toString());
        // await equipmentFormPage.softwareVersion.fill(softwareVersion.toString());
        // await equipmentFormPage.hostName.fill(hostName);
        // await equipmentFormPage.portNumber.fill(portNumber.toString());
        // await equipmentFormPage.twentyFeetContainerOffset.fill(twentyFtContainer.toString());
        // await equipmentFormPage.subTypeBAGV.click();
        // await equipmentFormPage.protocolTypeNGEN2.click();
        // await equipmentFormPage.energySourceTypeFuel.click();
        // await equipmentFormPage.saveButton.click();
    }

    async insertInInputField(vehicle: VehicleType) {
        await this.selectInput.click();
        await this.selectInput.fill(vehicle.valueOf());
        await this.selectInput.press('Enter');
    }
}