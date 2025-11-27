import {vehicleCode} from "../../../enums/MaintenanceVehicleCode";

/**
 * Data Transfer Object voor een onderhoudsevenement
 * Gebruikt TypeScript features vergelijkbaar met Lombok:
 * - Readonly properties (zoals @Value in Lombok)
 * - Builder pattern support
 * - Utility methods (toString, equals)
 */
export class MaintenanceEventDTO {
    readonly vehicleCode: vehicleCode;
    readonly startDate: string;
    readonly endDate: string;

    constructor(vehicleCode: vehicleCode, startDate: string, endDate: string) {
        this.vehicleCode = vehicleCode;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    /**
     * Static factory method - vergelijkbaar met Lombok's @Builder
     */
    static builder(): MaintenanceEventDTOBuilder {
        return new MaintenanceEventDTOBuilder();
    }

    /**
     * ToString method - vergelijkbaar met Lombok's @ToString
     */
    toString(): string {
        return `MaintenanceEventDTO(vehicleCode=${this.vehicleCode}, startDate=${this.startDate}, endDate=${this.endDate})`;
    }

    /**
     * Equals method - vergelijkbaar met Lombok's @EqualsAndHashCode
     */
    equals(other: MaintenanceEventDTO): boolean {
        return this.vehicleCode === other.vehicleCode &&
               this.startDate === other.startDate &&
               this.endDate === other.endDate;
    }

    /**
     * Copy with - vergelijkbaar met Lombok's @With
     */
    withVehicleCode(vehicleCode: vehicleCode): MaintenanceEventDTO {
        return new MaintenanceEventDTO(vehicleCode, this.startDate, this.endDate);
    }

    withStartDate(startDate: string): MaintenanceEventDTO {
        return new MaintenanceEventDTO(this.vehicleCode, startDate, this.endDate);
    }

    withEndDate(endDate: string): MaintenanceEventDTO {
        return new MaintenanceEventDTO(this.vehicleCode, this.startDate, endDate);
    }
}

/**
 * Builder klasse voor MaintenanceEventDTO - vergelijkbaar met Lombok's @Builder
 */
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
            throw new Error('Alle velden zijn verplicht: vehicleCode, startDate, endDate');
        }
        return new MaintenanceEventDTO(this.vehicleCode, this.startDate, this.endDate);
    }
}
