import {vehicleCode} from "../../enums/MaintenanceVehicleCode";

export const MaintenanceTestData = {
    test1: {
        input: {
            vehicle: vehicleCode.QC8,
            startDate: "Nov 20, 2025 (15:20)",
            endDate: "Nov 20, 2026 (20:00)",
        },
        confirmDate: "Nov 21, 2027 (20:00)",
    },

    // Test 2: Create, edit and delete a maintenance schedule
    test2: {
        input: {
            vehicle: vehicleCode.AL1,
            startDate: "Nov 15, 2025 (15:47)",
            endDate: "Nov 20, 2026 (10:00)",
        },
        edit: {
            newStartDate: "Nov 20, 2026 (15:47)",
            newEndDate: "Nov 25, 2026 (10:00)",
        },
    },

    // Test 3: Arrange and filter table data
    test3: {
        inputs: [
            {
                vehicle: vehicleCode.AL1,
                startDate: "Nov 15, 2025 (15:47)",
                endDate: "Nov 21, 2026 (10:00)",
            },
            {
                vehicle: vehicleCode.AL3,
                startDate: "Nov 10, 2025 (15:47)",
                endDate: "Nov 26, 2026 (10:00)",
            },
            {
                vehicle: vehicleCode.AW2,
                startDate: "Nov 09, 2025 (15:47)",
                endDate: "Nov 26, 2026 (10:00)",
            },
            {
                vehicle: vehicleCode.AW3,
                startDate: "Nov 27, 2025 (15:47)",
                endDate: "Nov 27, 2026 (10:00)",
            },
        ],
    },
};




