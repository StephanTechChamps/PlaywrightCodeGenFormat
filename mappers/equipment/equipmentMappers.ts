import {equipmentTableRowDataForARMG} from "../../interfaces/equipment/equipmentTableRowDataForARMG";
import {equipmentTableRowDataForQC} from "../../interfaces/equipment/equipmentTableRowDataForQC";
import {equipmentTableRowDataForACS} from "../../interfaces/equipment/equipmentTableRowDataForACS";
import {equipmentTableRowForAGV} from "../../interfaces/equipment/equipmentTableRowDataForAGV";
import {equipmentTableRowDataForREACHSTACKER} from "../../interfaces/equipment/equipmentTableRowDataForREACHSTACKER";
import {
    equipmentTableRowDataForREMOTEOPERATINGSTATION
} from "../../interfaces/equipment/equipmentTableRowDataForREMOTEOPERATINGSTATION";

export function mapAllValuesToARMGObjects(value: string[]): equipmentTableRowDataForARMG {
    return {
        name: value[0] ?? '',
        length: value[1] ?? '',
        width: value[2] ?? '',
        maxWeight: value[3] ?? '',
        liftCapability: value[4] ?? '',
        maxTwinWeightDifference: value[5] ?? '',
        maxTierHeight: value[6] ?? '',
        softwareVersion: value[7] ?? '',
        hostName: value[8] ?? '',
        automationPort: value[9] ?? '',
        stackProfilingPort: value[10] ?? '',
        craneId: value[11] ?? '',
        boundary: value[12] ?? '',
    };
}

export function mapAllValuesToQCObjects(value: string[]): equipmentTableRowDataForQC {
    return {
        name: value[0] ?? '',
        maxWeight: value[1] ?? '',
        // liftCapability: value[2] ?? '',
        maxTwinWeightDifference: value[2] ?? '',
        // portalTrolley: value[4] ?? '',
        // platform: value[5] ?? '',
        availableLocationsOnPlatform: value[3] ?? '',
        // sharedLegSpace: value[6] ?? '',
        // berth: value[7] ?? '',
        // lane: value[8] ?? '',
        typologyIndex: value[4] ?? '',
        softwareVersion: value[5] ?? '',
        provider: value[6] ?? '',
        url: value[7] ?? '',
        // boundary: value[13] ?? '',
    };
}

// export function mapAllValuesToQCObjects(value: string[]): equipmentTableRowDataForQC {
//     return {
//         name: value[0] ?? '',
//         maxWeight: value[1] ?? '',
//         liftCapability: value[2] ?? '',
//         maxTwinWeightDifference: value[3] ?? '',
//         portalTrolley: value[4] ?? '',
//         platform: value[5] ?? '',
//         availableLocationsOnPlatform: value[6] ?? '',
//         sharedLegSpace: value[6] ?? '',
//         berth: value[7] ?? '',
//         lane: value[8] ?? '',
//         typologyIndex: value[9] ?? '',
//         softwareVersion: value[10] ?? '',
//         provider: value[11] ?? '',
//         url: value[12] ?? '',
//         boundary: value[13] ?? '',
//     };
// }

export function mapAllValuesToACSObjects(value: string[]): equipmentTableRowDataForACS {
    return {
        name: value[0] ?? '',
        associatedLocations: value[1] ?? '',
        associatedBuffer: value[2] ?? ''
    };
}

export function mapAllValuesToAGVObjects(value: string[]): equipmentTableRowForAGV {
    return {
        name: value[0] ?? '',
        maxWeight: value[1] ?? '',
        liftCapability: value[2] ?? '',
        maxTwinWeightDifference: value[3] ?? '',
        softwareVersion: value[4] ?? '',
        hostName: value[5] ?? '',
        portNumber: value[6] ?? '',
        SubType: value[7] ?? '',
        protocolType: value[8] ?? '',
        energySourceType: value[9] ?? '',
        chassisSpecification: value[10] ?? '',
        twentyContainerOffset: value[11] ?? '',
        boundary: value[12] ?? ''
    };
}

export function mapAllValuesToReachStackerObjects(value: string[]): equipmentTableRowDataForREACHSTACKER {
    return {
        name: value[0] ?? '',
        maxWeight: value[1] ?? '',
        liftCapability: value[2] ?? '',
        maxTwinWeightDifference: value[3] ?? '',
        maxTierHeight: value[4] ?? '',
        softwareVersion: value[5] ?? '',
        defaultPosition: value[6] ?? '',
        boundary: value[7] ?? ''
    };
}

export function mapAllValuesToRemoteOperatingStationObjects(value: string[]): equipmentTableRowDataForREMOTEOPERATINGSTATION {
    return {
        name: value[0] ?? '',
        id: value[1] ?? '',
        type: value[2] ?? '',
        allowedOperations: value[3] ?? '',
    };
}

