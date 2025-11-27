import {MaintenanceEventDTO} from "../pom/maintenance/dto/MaintenanceEventDTO";
import {vehicleCode} from "../enums/MaintenanceVehicleCode";

export class MaintenanceEventDTOBuilder {
    private vehicleCode?: vehicleCode;
    private startDate?: string;
    private endDate?: string;

    withVehicleCode(vehicleCode: vehicleCode): MaintenanceEventDTOBuilder {
        this.vehicleCode = vehicleCode;
        return this;
    }

    withStartDate(startDate: string): MaintenanceEventDTOBuilder {
        this.startDate = startDate;
        return this;
    }

    withEndDate(endDate: string): MaintenanceEventDTOBuilder {
        this.endDate = endDate;
        return this;
    }

    build(): MaintenanceEventDTO {
        if (!this.vehicleCode || !this.startDate || !this.endDate) {
            throw new Error('You need to insert all of these fields: vehicleCode, startDate, endDate');
        }
        return new MaintenanceEventDTO(this.vehicleCode, this.startDate, this.endDate);
    }
}