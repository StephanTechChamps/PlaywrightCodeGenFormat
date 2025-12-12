import {Page, Locator, expect} from "@playwright/test";
import {MAINTENANCE_URL} from "../../config/projectConfig";
import {MaintenanceTableRowData} from "../../interfaces/maintenance/MaintenanceTableRowData";
import {vehicleCode} from "../../enums/MaintenanceVehicleCode";
import {AddMaintenanceFormPage} from "./addMaintenanceFormPage";

export class MaintenanceTable {
    private readonly page: Page;
    private readonly allTableHeaderElements: Locator;
    readonly maintenanceTableRow: Locator;
    private readonly equipmentElementFieldInRow: Locator;
    private readonly plannedStartDateElementInRow: Locator;
    private readonly plannedEndDateElementInRow: Locator;
    private readonly filterSearchInput: Locator;
    private readonly editButton: Locator;
    private readonly removeButton: Locator;
    private readonly popupTitle: Locator;
    private readonly confirmRemoveButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.allTableHeaderElements = page.locator(' [class="header-cell"] span[aria-expanded="false"]');
        this.maintenanceTableRow = page.locator('[class="tba-grid-container"] tr[class=""]');
        this.equipmentElementFieldInRow = page.locator('td span[aria-haspopup="true"]');
        this.filterSearchInput = page.locator('input[placeholder="Equipment name"]');
        this.removeButton = page.locator('//div[@role="menuitem"]//div[text()=" Remove "]');
        this.confirmRemoveButton = page.locator('//span[text()=" Remove CHE "]/ancestor::button');
        this.editButton = page.locator('(//div[text()=" Edit maintenance " and contains(@class, "v-list-item__title")])[1]');
        this.popupTitle = page.locator('.tba-dialog-title');
    }

    private async navigateToMaintenancePage() {
        await this.page.goto(MAINTENANCE_URL);
    }

    async getActualEquipmentTableData() {
        const tableRows: Locator[] = await this.maintenanceTableRow.all();
        const actualWebTableData: MaintenanceTableRowData[] = await Promise.all(
            tableRows.map(async (row) => {
                return await this.mappedDataPerRow(row);
            })
        );
        return actualWebTableData;
    }

    private async mappedDataPerRow(row: Locator) {
        const equipmentName = await row.locator(this.equipmentElementFieldInRow).innerText();
        const plannedStartDate = await row.locator(this.plannedStartDateElementInRow).innerText();
        const plannedEndDate = await row.locator(this.plannedEndDateElementInRow).innerText();
        return {equipmentName, plannedStartDate, plannedEndDate};
    }

    private async getAllHeadersOfDataTable() {
        await this.navigateToMaintenancePage()
        const headerElements = await this.allTableHeaderElements.allTextContents();
        return headerElements.filter(text => text.trim() !== '');
    }

    async validateHeadersArePresent() {
        const headers = await this.getAllHeadersOfDataTable();
        const expectedHeaders = ['Equipment', 'Planned start date', 'Planned end date'];
        return JSON.stringify(headers) == JSON.stringify(expectedHeaders);
    }

    async applyFilter(item: string) {
        await this.filterSearchInput.click()
        await this.filterSearchInput.fill(item);
        await this.filterSearchInput.press('Enter');
    }

    async clickTableSortByHeader(header: "Equipment" | "Planned start date" | "Planned end date") {
        const headerTitle = await this.headerLocator(header);
        await headerTitle.click();
        const headerButton = await this.getHeaderFilter(header);
        await headerButton.click();
    }

    private async headerLocator(header: "Equipment" | "Planned start date" | "Planned end date") {
        return this.page.locator(`//span[text()="${header}"]`)
    }

    private async getHeaderFilter(header: string): Promise<Locator> {
        return this.page.locator(`//span[text()="${header}"]/..//following-sibling::i`)
    }

    async editMaintenanceEvent(equipment: vehicleCode, start: string, end: string, newDate: string, finalDate: string): Promise<void> {
        await this.openEditMenu(equipment, start, end);
        await this.editButton.click();
        const form = new AddMaintenanceFormPage(this.page)
        await form.editMaintenanceEventForEquipment(equipment, newDate, finalDate);
    }

    async openEditMenu(equipment: string, start: string, end: string): Promise<void> {
        const menu = this.getHiddenMenuLocator(equipment, start, end);
        await menu.hover();
        await menu.click();
    }

    private getHiddenMenuLocator(equipment: string, start: string, end: string): Locator {
        return this.page.locator(
            `//span[text()="${equipment}"]/../../../..//td[text()=' ${start} ']/..//span[text()='${end}']/../../..//button[@class="tba-icon-default-important actions-on-hover v-btn v-btn--icon v-btn--round v-btn--text theme--light v-size--default"]`
        );
    }

    async removeMaintenanceMaintenanceEvent(equipment: string, start: string, end: string): Promise<void> {
        await this.openEditMenu(equipment, start, end);
        await this.removeButton.click();
        await expect(this.popupTitle).toHaveText("Remove planned maintenance?");
        await this.confirmRemoveButton.click();
    }
}

