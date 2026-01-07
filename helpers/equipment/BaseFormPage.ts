import { Locator } from '@playwright/test';
import { FieldSpec } from '../../interfaces/equipment/fieldspec'
import { Action } from '../../enums/Action';
import { HomePage } from '../../pom/navigation/homePage';

export abstract class BaseFormPage {
    protected readonly homePage: HomePage;
    protected abstract saveButton: Locator;

    protected constructor(homePage: HomePage) {
        this.homePage = homePage;
    }

    protected async interact(field: FieldSpec) {
        const { locator, action, value } = field;
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

    protected async openAndFillInCreationForm(fields: FieldSpec[]): Promise<void> {
        await this.homePage.clickCreateVehicleButton();

        for (const field of fields) {
            await this.interact(field);
        }
        await this.saveButton.click();
        await this.saveButton.waitFor({state:"hidden"})
    }

    protected async openAndFillInEditForm(fields: FieldSpec[]): Promise<void> {

        for (const field of fields) {
            await this.interact(field);
        }
        await this.saveButton.click();
        await this.saveButton.waitFor({state:"hidden"})
    }
}
