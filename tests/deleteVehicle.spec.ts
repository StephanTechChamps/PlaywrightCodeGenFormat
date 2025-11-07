import {test} from "../fixtures/tests.fixtures";
import {LoginPage} from "../pom/auth/loginPage";
import {BASE_URL, PASSWORD, USERNAME} from "../fixtures/projectConfig";
import {label, severity, tag} from "allure-js-commons";
import {HomePage} from "../pom/navigation/homePage";
import {VehicleType} from "../fixtures/vehicleType";
import {equipmentOverviewPage} from "../pom/equipment/equipmentOverviewPage";

test.use({ignoreHTTPSErrors: true});

// Log in before each test in this file
test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(BASE_URL, USERNAME, PASSWORD);
    setAllureProperties();
});

async function setAllureProperties() {
    await severity('Critical');
    await tag('Smoke');
    await label('suite', "Login tests");
}

test("Delete equipment-type A-RMG", async ({page}) => {
    const homePage = new HomePage(page);
    const overviewPage = new equipmentOverviewPage(page);
    await homePage.selectVehicleType(VehicleType.A_RMG);
    await overviewPage.deleteEquipment("AL01");
});

test("Delete equipment-type MSC", async ({page}) => {
    const homePage = new HomePage(page);
    const overviewPage = new equipmentOverviewPage(page);
    await homePage.selectVehicleType(VehicleType.MSC);
    await overviewPage.deleteEquipment("SH01");
})

test("Delete equipment-type QC", async ({page}) => {
    const homePage = new HomePage(page);
    const overviewPage = new equipmentOverviewPage(page);
    await homePage.selectVehicleType(VehicleType.QC);
    await overviewPage.deleteEquipment("QC01");
})

test("Delete equipment-type REACH-STACKER", async ({page}) => {
    const homePage = new HomePage(page);
    const overviewPage = new equipmentOverviewPage(page);
    await homePage.selectVehicleType(VehicleType.REACH_STACKER);
    await overviewPage.deleteEquipment("RS01");
})

test("Delete equipment-type Terminal Truck", async ({page}) => {
    const homePage = new HomePage(page);
    const overviewPage = new equipmentOverviewPage(page);
    await homePage.selectVehicleType(VehicleType.TERMINAL_TRUCK);
    await overviewPage.deleteEquipment("TT01");
})