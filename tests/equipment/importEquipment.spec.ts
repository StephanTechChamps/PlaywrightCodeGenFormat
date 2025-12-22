import {HomePage} from "../../pom/navigation/homePage";
import {LoginPage} from "../../pom/auth/loginPage";
import {BASE_URL, PASSWORD, USERNAME} from "../../config/projectConfig";
import {expect, test} from '../../fixtures/tests.fixtures'
import {label, severity, tag} from "allure-js-commons";
import {VehicleType} from "../../enums/vehicleType";
import {Page} from "@playwright/test";
import {EquipmentOverviewPage} from "../../pom/equipment/equipmentOverviewPage";
import {ExportEquipmentFormPage} from "../../pom/equipment/exportEquipmentFormPage"
import {htcExpectedDataForEquipmentARMG} from "../../test-data/equipment/htc/htcEquipmentTestDataForARMG"
import {EquipmentTable} from "../../pom/equipment/equipmentTable";
// import {expectedDataForQC} from "../test-data/equipment/HTC/equipmentTestDataForQC";
import {expectedDataForEquipmentACS} from "../../test-data/equipment/htc/equipmentTestDataForACS";
import {equipmentTableRowDataForACS} from "../../interfaces/equipment/equipmentTableRowDataForACS";
import {ctbExpectedDataForEquipmentAGV} from "../../test-data/equipment/ctb/ctbAGVEquipment";
import {expectedDataForReachStacker} from "../../test-data/equipment/htc/equipmentTestDataForReachStacker";
import {
    expectedDataForRemoteOperatingStation
} from "../../test-data/equipment/htc/equipmentTestDataForRemoteOperatingStation";
import {ctbExpectedDataForQc} from "../../test-data/equipment/ctb/ctbExpectedDataForQc";

test.use({ignoreHTTPSErrors: true});

test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(BASE_URL, USERNAME, PASSWORD);
    setAllureProperties();
});

function setupPages(page: Page) {
    const homePage = new HomePage(page);
    const equipmentOverviewPage = new EquipmentOverviewPage(page)
    const exportEquipmentFormPage = new ExportEquipmentFormPage(page);
    const equipmentTable = new EquipmentTable(page)
    return {homePage, equipmentOverviewPage, exportEquipmentFormPage, equipmentTable};
}

function setAllureProperties() {
    severity("Critical");
    tag("Smoke");
    label("suite", "Import equipment");
}

// test("Import REACH STACKER equipment from a file", async ({page}) => {
//     const {homePage, equipmentOverviewPage} = setupPages(page);
//     await homePage.selectVehicleType(VehicleType.REACH_STACKER);
//     await equipmentOverviewPage.importAllEquipmentFromFile("REACH_STACKER_IMPORT.csv")
// });
//
test("Import A-RMG equipment from a file",
    {
        tag: ["@htc", "@smoke", "@regression"]
    }, async ({page}) => {
        const {homePage, equipmentOverviewPage} = setupPages(page);
        await homePage.selectVehicleType(VehicleType.A_RMG);
        await equipmentOverviewPage.importAllEquipmentFromHtcFile("A_RMG_IMPORT.csv")
    });

test("Verify test data for A-RMG",
    {
        tag: ["@htc", "@regression"]
    }, async ({page}) => {
        const {homePage, equipmentTable} = setupPages(page);
        await homePage.selectVehicleType(VehicleType.A_RMG);
        const actualData = await equipmentTable.getActualEquipmentTableDataForARMG();
        expect(actualData).toEqual(htcExpectedDataForEquipmentARMG)
    });


test("Verify test data for ACS",
    {
        tag: ["@ctb", "@smoke", "@regression"]
    }, async ({page}) => {
        const {homePage, equipmentTable} = setupPages(page);
        await homePage.selectVehicleType(VehicleType.ACS);
        const actualData: equipmentTableRowDataForACS[] = await equipmentTable.getActualEquipmentTableDataForACS();
        expect(actualData).toEqual(expectedDataForEquipmentACS)
    });

test("Verify test data for AGV",
    {
        tag: ["@ctb", "@smoke", "@regression"]
    }, async ({page}) => {
        const {homePage, equipmentTable} = setupPages(page);
        await homePage.selectVehicleType(VehicleType.AGV);
        const actualData = await equipmentTable.getActualEquipmentTableDataForAGV();
        expect(actualData).toEqual(ctbExpectedDataForEquipmentAGV)

    })

test("Verify test data for QC",
    {
        tag: ["@htc", "@smoke", "@regression"]
    }, async ({page}) => {
        const {homePage, equipmentTable} = setupPages(page);
        await homePage.selectVehicleType(VehicleType.QC);
        const actualData = await equipmentTable.getActualEquipmentTableDataForQC();
        expect(actualData).toEqual(ctbExpectedDataForQc)
    });

test("Verify test data for Reach-stacker",
    {
        tag: ["@htc", "@smoke", "@regression"]
    }, async ({page}) => {
        const {homePage, equipmentTable} = setupPages(page);
        await homePage.selectVehicleType(VehicleType.REACH_STACKER);
        const actualData = await equipmentTable.getActualEquipmentTableDataForReachStacker();
        expect(actualData).toEqual(expectedDataForReachStacker)
    })

test("Verify test data for Remote operating Station",
    {
        tag: ["@htc", "@smoke", "@regression"]
    }, async ({page}) => {
        const {homePage, equipmentTable} = setupPages(page);
        await homePage.selectVehicleType(VehicleType.REMOTE_OPERATING_STATION);
        const actualData = await equipmentTable.getActualEquipmentTableDataForRemoteOperatingStation();
        expect(actualData).toEqual(expectedDataForRemoteOperatingStation)
    })