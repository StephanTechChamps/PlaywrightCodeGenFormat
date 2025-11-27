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


}