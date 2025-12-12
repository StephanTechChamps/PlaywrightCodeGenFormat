import {Locator} from "@playwright/test";
import {Action} from "../../enums/Action";

export interface FieldSpec {
    locator: Locator;
    action: Action;
    value?: string | number | boolean;
}