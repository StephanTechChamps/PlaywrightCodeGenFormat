import { Locator, Page} from '@playwright/test';
import {VehicleType} from "../../enums/vehicleType";

export class VehiclesTab {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    getVehicleTypInputLocator(vehicle: VehicleType): Locator{
        return this.page.locator(`[data-cy='${vehicle}']`);
    }

    async selectVehicleType(vehicle:VehicleType): Promise<void> {
        const vehicleInput = this.getVehicleTypInputLocator(vehicle);
        await vehicleInput.click();
    }
}