import {expect, Locator, Page} from "@playwright/test";
import {equipmentTableRowDataForARMG} from "../../interfaces/equipment/equipmentTableRowDataForARMG";
import {equipmentTableRowDataForQC} from "../../interfaces/equipment/equipmentTableRowDataForQC";
import {equipmentTableRowDataForACS} from "../../interfaces/equipment/equipmentTableRowDataForACS";
import {equipmentTableRowForAGV} from "../../interfaces/equipment/equipmentTableRowDataForAGV";
import {
    mapAllValuesToACSObjects,
    mapAllValuesToAGVObjects,
    mapAllValuesToARMGObjects,
    mapAllValuesToQCObjects,
    mapAllValuesToReachStackerObjects,
    mapAllValuesToRemoteOperatingStationObjects
} from '../../mappers/equipment/equipmentMappers'
import {equipmentTableRowDataForREACHSTACKER} from "../../interfaces/equipment/equipmentTableRowDataForREACHSTACKER";
import {
    equipmentTableRowDataForREMOTEOPERATINGSTATION
} from "../../interfaces/equipment/equipmentTableRowDataForREMOTEOPERATINGSTATION";


export class EquipmentTable {
    private readonly page: Page;
    private readonly equipmentTable: Locator;
    private readonly tableRow: Locator;
    private readonly rowElement: Locator;
    private readonly equipmentOverviewTable: Locator;
    private readonly removeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.equipmentTable = page.locator('[class="tba-editable-grid equipment-table"]')
        this.tableRow = page.locator('[class="tba-editable-grid equipment-table"] tr[class=""]');
        this.rowElement = page.locator('td[class=""]');
        this.equipmentOverviewTable = page.locator('[class="tba-editable-grid equipment-table"]');
        this.removeButton = page.getByText(' Remove ');
    }
    private async getTablePageLocator(page: number){
        return this.page.locator(`//button[text()="${page}"]`)
    }

    async navigateToTablePage(page:number){
        const selectPage = await this.getTablePageLocator(page)
        await selectPage.click();
    }

    async deleteEquipment(equipmentName: string) {
        await this.equipmentOverviewTable.isVisible();
        await this.openHamburgerMenu(equipmentName);
        await this.removeButton.click();
    }

    private async openHamburgerMenu(equipmentName: string) {
        const hamburgerMenu = this.getHiddenMenuLocator(equipmentName);
        await hamburgerMenu.hover();
        await hamburgerMenu.click();
    }

    private getHiddenMenuLocator(equipmentName: string): Locator {
        return this.page.locator(`//span[text()="${equipmentName}"]/../../../..//td//button//span/i`);
    }

    async asserDataTableIsVisible() {
        await expect(this.equipmentTable).toBeVisible();
    }

    async getActualEquipmentTableDataForARMG(): Promise<equipmentTableRowDataForARMG[]> {
        return await this.getActualEquipmentTableDataAndMap(mapAllValuesToARMGObjects);
    }

    async getActualEquipmentTableDataForQC(): Promise<equipmentTableRowDataForQC[]> {
        return await this.getActualEquipmentTableDataAndMap(mapAllValuesToQCObjects);
    }

    async getActualEquipmentTableDataForACS(): Promise<equipmentTableRowDataForACS[]> {
        return await this.getActualEquipmentTableDataAndMap(mapAllValuesToACSObjects);
    }

    async getActualEquipmentTableDataForAGV(): Promise<equipmentTableRowForAGV[]> {
        return await this.getActualEquipmentTableDataAndMap(mapAllValuesToAGVObjects);
    }

    async getActualEquipmentTableDataForReachStacker(): Promise<equipmentTableRowDataForREACHSTACKER[]> {
        return await this.getActualEquipmentTableDataAndMap(mapAllValuesToReachStackerObjects)
    }

    async getActualEquipmentTableDataForRemoteOperatingStation(): Promise<equipmentTableRowDataForREMOTEOPERATINGSTATION[]> {
        return await this.getActualEquipmentTableDataAndMap(mapAllValuesToRemoteOperatingStationObjects);
    }

    private async getActualEquipmentTableDataAndMap<T>(callback: (value: string[]) => T): Promise<T[]> {
        const contents: string[][] = await this.getArrayOfTableRowsAsArraysOfStrings();
        return contents.map(callback);
    }

    private async getArrayOfTableRowsAsArraysOfStrings(): Promise<string[][]> {
        await this.asserDataTableIsVisible();
        const tableRows = await this.tableRow.all();
        return await Promise.all(
            tableRows.map(async (row) => {
                const values = await row.locator(this.rowElement).allTextContents();
                return values.map(v => v.trim());
            })
        );
    }
}