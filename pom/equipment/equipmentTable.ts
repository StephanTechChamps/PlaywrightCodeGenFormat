import {expect, Locator, Page} from "@playwright/test";
import {equipmentTableRowDataForARMG} from "./interfaces/equipmentTableRowDataForARMG";
import {equipmentTableRowDataForQC} from "./interfaces/equipmentTableRowDataForQC";
import {equipmentTableRowDataForACS} from "./interfaces/equipmentTableRowDataForACS";
import {equipmentTableRowForAGV} from "./interfaces/equipmentTableRowDataForAGV";
import {
    mapAllValuesToARMGObjects, mapAllValuesToQCObjects, mapAllValuesToACSObjects, mapAllValuesToAGVObjects,
    mapAllValuesToReachStackerObjects, mapAllValuesToRemoteOperatingStationObjects} from './mappers/equipmentMappers'
import {equipmentTableRowDataForREACHSTACKER} from "./interfaces/equipmentTableRowDataForREACHSTACKER";
import {
    equipmentTableRowDataForREMOTEOPERATINGSTATION
} from "./interfaces/equipmentTableRowDataForREMOTEOPERATINGSTATION";


export class EquipmentTable {
    readonly page: Page;
    readonly equipmentTable: Locator;
    readonly tableRow: Locator;
    readonly rowElement: Locator;

    constructor(page: Page) {
        this.page = page;
        this.equipmentTable = page.locator('[class="tba-editable-grid equipment-table"]')
        this.tableRow = page.locator('[class="tba-editable-grid equipment-table"] tr[class=""]');
        this.rowElement = page.locator('[aria-haspopup="true"]');
    }

    async asserDataTableIsVisible() {
        await expect(this.equipmentTable).toBeVisible();
    }

    async getActualEquipmentTableDataForAMG(): Promise<equipmentTableRowDataForARMG[]> {
        await this.asserDataTableIsVisible();
        return Promise.all(
            (await this.tableRow.all()).map(async (row) => {
                const values = await row.locator(this.rowElement).allTextContents();
                return mapAllValuesToARMGObjects(values.map(v => v.trim()));
            })
        );
    }

    async getActualEquipmentTableDataForQC(): Promise<equipmentTableRowDataForQC[]> {
        await this.asserDataTableIsVisible();
        return Promise.all(
            (await this.tableRow.all()).map(async (row) => {
                const values = await row.locator(this.rowElement).allTextContents();
                return mapAllValuesToQCObjects(values.map(v => v.trim()));
            })
        );
    }

    async getActualEquipmentTableDataForACS(): Promise<equipmentTableRowDataForACS[]> {
        await this.asserDataTableIsVisible();
        return Promise.all(
            (await this.tableRow.all()).map(async (row) => {
                const values = await row.locator(this.rowElement).allTextContents();
                return mapAllValuesToACSObjects(values.map(v => v.trim()));
            })
        );
    }

    async getActualEquipmentTableDataForAGV(): Promise<equipmentTableRowForAGV[]> {
        await this.asserDataTableIsVisible();
        return Promise.all(
            (await this.tableRow.all()).map(async (row) => {
                const values = await row.locator(this.rowElement).allTextContents();
                return mapAllValuesToAGVObjects(values.map(v => v.trim()));
            })
        );
    }

    async getActualEquipmentTableDataForReachStacker(): Promise<equipmentTableRowDataForREACHSTACKER[]> {
        await this.asserDataTableIsVisible();
        return Promise.all(
            (await this.tableRow.all()).map(async (row) => {
                const values = await row.locator(this.rowElement).allTextContents();
                return mapAllValuesToReachStackerObjects(values.map(v => v.trim()));
            })
        );
    }

    async getActualEquipmentTableDataForRemoteOperatingStation(): Promise<equipmentTableRowDataForREMOTEOPERATINGSTATION[]> {
        await this.asserDataTableIsVisible();
        return Promise.all(
            (await this.tableRow.all()).map(async (row) => {
                const values = await row.locator(this.rowElement).allTextContents();
                return mapAllValuesToRemoteOperatingStationObjects(values.map(v => v.trim()));
            })
        );
    }



}