import {Page, Locator, expect} from "@playwright/test";
import {MAINTENANCE_URL} from "../../config/projectConfig";
import {MaintenanceTableRowData} from "../../interfaces/MaintenanceTableRowData";

export class MaintenanceTable {
    readonly page: Page;
    readonly allTableHeaderElements: Locator;
    readonly maintenanceTableRow: Locator;
    readonly equipmentElementFieldInRow: Locator;
    readonly plannedStartDateElementInRow: Locator;
    readonly plannedEndDateElementInRow: Locator;
    readonly filterSearchInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.allTableHeaderElements = page.locator(' [class="header-cell"] span[aria-expanded="false"]');
        this.maintenanceTableRow = page.locator('[class="tba-grid-container"] tr[class=""]');
        this.equipmentElementFieldInRow = page.locator('td span[aria-haspopup="true"]');
        this.plannedStartDateElementInRow = page.locator('td:nth-child(2)')
        this.plannedEndDateElementInRow = page.locator(' //td//div[@class="end-date"]//span[1]');
        this.filterSearchInput = page.locator('input[placeholder="Equipment name"]');
    }
    private async navigateToMaintenancePage() {
        await this.page.goto(MAINTENANCE_URL);
    }

    async getActualMaintenanceTableData() {
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

    async getAllHeadersOfDataTable() {
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

    async headerLocator(header: "Equipment" | "Planned start date" | "Planned end date") {
        return this.page.locator(`//span[text()="${header}"]`)
    }

    async getHeaderFilter(header: string): Promise<Locator> {
        return this.page.locator(`//span[text()="${header}"]/..//following-sibling::i`)
    }
}

