import {vehicleCode} from "../enums/MaintenanceVehicleCode";

export class CreateMaintenanceEventDTO {
    vehicleCode: vehicleCode;
    startDate: string;
    endDate: string;

    constructor(vehicleCode: vehicleCode, startDate: string, endDate: string) {
        this.vehicleCode = vehicleCode;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    static builder() {
        return new CreateMaintenanceEventDTOBuilder();
    }
}

class CreateMaintenanceEventDTOBuilder {
    private vehicleCode!: vehicleCode;
    private startDate!: string;
    private endDate!: string;

    VehicleCode(code: vehicleCode): this {
        this.vehicleCode = code;
        return this;
    }

    StartDate(date: string): this {
        this.startDate = date;
        return this;
    }

    EndDate(date: string): this {
        this.endDate = date;
        return this;
    }

    build(): CreateMaintenanceEventDTO {
        return new CreateMaintenanceEventDTO(this.vehicleCode, this.startDate, this.endDate);
    }
}