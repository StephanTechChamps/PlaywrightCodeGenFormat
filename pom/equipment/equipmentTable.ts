import {Locator, Page} from "@playwright/test";
import {equipmentTableRowDataForARMG} from "../../interfaces/equipment/equipmentTableRowDataForARMG";
import {equipmentTableRowDataForQC} from "../../interfaces/equipment/equipmentTableRowDataForQC";
import {equipmentTableRowDataForACS} from "../../interfaces/equipment/equipmentTableRowDataForACS";
import {equipmentTableRowForAGV} from "../../interfaces/equipment/equipmentTableRowDataForAGV";
import {
    mapAllValuesToASTRADObjects,
    mapAllValuesToACSObjects,
    mapAllValuesToAGVObjects,
    mapAllValuesToARMGObjects,
    mapAllValuesToARTGObjects, mapAllValuesToAUTOTTObjects, mapAllValuesToBESObjects, mapAllValuesToMSCObjects,
    mapAllValuesToQCObjects,
    mapAllValuesToReachStackerObjects,
    mapAllValuesToRemoteOperatingStationObjects
} from '../../mappers/equipment/equipmentMappers'
import {equipmentTableRowDataForREACHSTACKER} from "../../interfaces/equipment/equipmentTableRowDataForREACHSTACKER";
import {
    equipmentTableRowDataForREMOTEOPERATINGSTATION
} from "../../interfaces/equipment/equipmentTableRowDataForREMOTEOPERATINGSTATION";
import {equipmentTableRowDataForMSC} from "../../interfaces/equipment/equipmentTableRowDataMSC";
import {equipmentTableRowDataForBES} from "../../interfaces/equipment/equipmentTableRowDataForBES";
import {equipmentTableRowDataForAUTOTT} from "../../interfaces/equipment/equipmentTableRowDataForAUTOTT";
import {equipmentTableRowForARTG} from "../../interfaces/equipment/equipmentTableRowDataForARTG";
import {equipmentTableRowDataForASTRAD} from "../../interfaces/equipment/equipmentTableRowDataForASTRAD";


export class EquipmentTable {
    private readonly page: Page;
    private readonly equipmentTable: Locator;
    private readonly tableRow: Locator;
    private readonly rowElement: Locator;
    private readonly equipmentOverviewTable: Locator;
    private readonly removeButton: Locator;
    private readonly editButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.equipmentTable = page.locator('[class="tba-editable-grid equipment-table"]')
        this.tableRow = page.locator('[class="tba-editable-grid equipment-table"] tr[class=""]');
        this.rowElement = page.locator('td[class=""]');
        this.equipmentOverviewTable = page.locator('[class="tba-editable-grid equipment-table"]');
        this.removeButton = page.getByText(' Remove ');
        this.editButton = page.locator('//span[text()=" Edit "]/parent::button')
    }

    private async getTablePageLocator(page: number) {
        return this.page.locator(`//button[text()="${page}"]`)
    }

    async navigateToTablePage(page: number) {
        const selectPage = await this.getTablePageLocator(page)
        await selectPage.click();
    }

    async deleteEquipment(equipmentName: string) {
        await this.equipmentOverviewTable.isVisible();
        await this.openHamburgerMenu(equipmentName);
        await this.removeButton.click();
    }

    async openEditEquipmentMenu(equipmentName: string) {
        await this.equipmentOverviewTable.isVisible();
        await this.openViewButtonMenu(equipmentName);
        await this.editButton.click();
    }

    private async openViewButtonMenu(equipmentName: string) {
        const viewMenu = this.getHiddenViewButtonLocator(equipmentName);
        await viewMenu.hover()
        await viewMenu.click()

    }

    private async openHamburgerMenu(equipmentName: string) {
        const hamburgerMenu = this.getHiddenMenuLocator(equipmentName);
        await hamburgerMenu.hover();
        await hamburgerMenu.click();
    }

    private getHiddenMenuLocator(equipmentName: string): Locator {
        return this.page.locator(`//span[text()="${equipmentName}"]/../../../..//td//button//span/i`);
    }

    private getHiddenViewButtonLocator(equipmentName: string): Locator {
        return this.page.locator(`//span[text()="${equipmentName}"]/../../../..//td//button//span[text()=' View ']`);
    }

    async asserDataTableIsVisible() {
        await this.equipmentTable.waitFor({ state: 'visible' });
    }

    async getActualEquipmentTableDataForARMG(): Promise<equipmentTableRowDataForARMG[]> {
        return this.getActualEquipmentTableDataAndMap(mapAllValuesToARMGObjects);
    }

    async getActualEquipmentTableDataForQC(): Promise<equipmentTableRowDataForQC[]> {
        return this.getActualEquipmentTableDataAndMap(mapAllValuesToQCObjects);
    }

    async getActualEquipmentTableDataForASTRAD(): Promise<equipmentTableRowDataForASTRAD[]> {
        return this.getActualEquipmentTableDataAndMap(mapAllValuesToASTRADObjects);
    }

    async getActualEquipmentTableDataForACS(): Promise<equipmentTableRowDataForACS[]> {
        return this.getActualEquipmentTableDataAndMap(mapAllValuesToACSObjects);

    }

    async getActualEquipmentTableDataForMSC(): Promise<equipmentTableRowDataForMSC[]> {
        return this.getActualEquipmentTableDataAndMap(mapAllValuesToMSCObjects);

    }
    async getActualEquipmentTableDataForAGV(): Promise<equipmentTableRowForAGV[]> {
        return this.getActualEquipmentTableDataAndMap(mapAllValuesToAGVObjects);
    }

    async getActualEquipmentTableDataForReachStacker(): Promise<equipmentTableRowDataForREACHSTACKER[]> {
        return this.getActualEquipmentTableDataAndMap(mapAllValuesToReachStackerObjects)
    }

    async getActualEquipmentTableDataForRemoteOperatingStation(): Promise<equipmentTableRowDataForREMOTEOPERATINGSTATION[]> {
        return this.getActualEquipmentTableDataAndMap(mapAllValuesToRemoteOperatingStationObjects);
    }

    async getActualEquipmentTableDataForBES(): Promise<equipmentTableRowDataForBES[]> {
        return this.getActualEquipmentTableDataAndMap(mapAllValuesToBESObjects);
    }

    async getActualEquipmentTableDataForAUTOTT(): Promise<equipmentTableRowDataForAUTOTT[]> {
        return this.getActualEquipmentTableDataAndMap(mapAllValuesToAUTOTTObjects);
    }

    async getActualEquipmentTableDataForARTG(): Promise<equipmentTableRowForARTG[]> {
        return this.getActualEquipmentTableDataAndMap(mapAllValuesToARTGObjects);
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