import {vehicleCode} from "../../fixtures/MaintenanceVehicleCode";

export const maintenanceTestData = {
    QC8: {
        input: {
            equipmentCode: vehicleCode.QC8,
            startDate: 'Nov 20, 2025 (15:20)',
            endDate: 'Nov 20, 2026 (20:00)',
            completionDate: 'Nov 21, 2027 (20:00)',
        },
        expected: {
            equipmentName: 'QC08',
            plannedStartDate: 'Nov 20, 2025 (15:20)',
            plannedEndDate: 'Nov 20, 2026 (20:00)',
        },
    },
    AL1: {
        input: {
            equipmentCode: vehicleCode.AL1,
            startDate: 'Nov 15, 2025 (15:47)',
            endDate: 'Nov 20, 2026 (10:00)',
            editedStartDate: 'Nov 20, 2026 (15:47)',
            editedEndDate: 'Nov 25, 2026 (10:00)',
        },
        expected: {
            initial: {
                equipmentName: 'AL01',
                plannedStartDate: 'Nov 15, 2025 (15:47)',
                plannedEndDate: 'Nov 20, 2026 (10:00)',
            },
            edited: {
                equipmentName: 'AL01',
                plannedStartDate: 'Nov 20, 2026 (15:47)',
                plannedEndDate: 'Nov 25, 2026 (10:00)',
            },
        },
    },
};