import {Action} from "../enums/Action";
import {FieldSpec} from "../interfaces/equipment/fieldspec";

export async function interact(field: FieldSpec) {
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
    }
}