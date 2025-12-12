import {test} from "@playwright/test";
import {LoginPage} from "../../pom/auth/loginPage";
import {VehiclesTab} from "../../pom/equipment/vehiclesTab"
import {BASE_URL, PASSWORD, USERNAME} from "../../config/projectConfig";
import {VehicleType} from "../../enums/vehicleType";

test.use({ ignoreHTTPSErrors: true });

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(BASE_URL, USERNAME, PASSWORD);

});

test("modify vehicle", async ({ page }) => {
    let vehiclesTab: VehiclesTab;
    vehiclesTab = new VehiclesTab(page);
    await vehiclesTab.selectVehicleType(VehicleType.A_STRAD)
});
