import {equipmentTableRowDataForARMG} from "../../interfaces/equipment/equipmentTableRowDataForARMG";
import {equipmentTableRowDataForQC} from "../../interfaces/equipment/equipmentTableRowDataForQC";
import {equipmentTableRowDataForACS} from "../../interfaces/equipment/equipmentTableRowDataForACS";
import {equipmentTableRowForAGV} from "../../interfaces/equipment/equipmentTableRowDataForAGV";
import {equipmentTableRowDataForREACHSTACKER} from "../../interfaces/equipment/equipmentTableRowDataForREACHSTACKER";
import {
    equipmentTableRowDataForREMOTEOPERATINGSTATION
} from "../../interfaces/equipment/equipmentTableRowDataForREMOTEOPERATINGSTATION";
import {equipmentTableRowDataForMSC} from "../../interfaces/equipment/equipmentTableRowDataMSC";
import {equipmentTableRowDataForBES} from "../../interfaces/equipment/equipmentTableRowDataForBES";
import {equipmentTableRowDataForAUTOTT} from "../../interfaces/equipment/equipmentTableRowDataForAUTOTT";
import {equipmentTableRowForARTG} from "../../interfaces/equipment/equipmentTableRowDataForARTG";
import {equipmentTableRowDataForASTRAD} from "../../interfaces/equipment/equipmentTableRowDataForASTRAD";
import {equipmentTableRowForRAILGANTRYCRANE} from "../../interfaces/equipment/equipmentTableRowDataForRAILGANTRYCRANE";
import {equipmentTableRowDataForTERMINALTRUCK} from "../../interfaces/equipment/equipmentTableRowDataForTERMINALTRUCK";

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

export function mapAllValuesToASTRADObjects(value: string[]): equipmentTableRowDataForASTRAD {
    return {
        name: value[0] ?? '',
        maxWeight: value[1] ?? '',
        liftCapability: value[2] ?? '',
        maxTwinWeightDifference: value[3] ?? "",
        maxTierHeight: value[4] ?? "",
        softwareVersion: value[5] ?? "",
        hostName: value[6] ?? "",
        portNumber: value[7] ?? "",
        subType: value[8] ?? "",
        protocolType: value[9] ?? "",
        energySource: value[10] ?? "",
        boundary: value[11] ?? "",
    };
}

export function mapAllValuesToQCObjects(value: string[]): equipmentTableRowDataForQC {
    return {
        name: value[0] ?? '',
        maxWeight: value[1] ?? '',
        liftCapability: value[2] ?? '',
        maxTwinWeightDifference: value[3] ?? '',
        portalTrolley: value[4] ?? '',
        platform: value[5] ?? '',
        availableLocationsOnPlatform: value[6] ?? '',
        sharedLegSpace: value[7] ?? '',
        berth: value[8] ?? '',
        lane: value[9] ?? '',
        typologyIndex: value[10] ?? '',
        softwareVersion: value[11] ?? '',
        provider: value[12] ?? '',
        url: value[13] ?? '',
        boundary: value[14] ?? '',
    };
}


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

export function mapAllValuesToBESObjects(value: string[]): equipmentTableRowDataForBES {
    return {
        name: value[0] ?? '',
        associatedLocations: value[1] ?? '',
        associatedBuffer: value[2] ?? '',
    };
}

export function mapAllValuesToAUTOTTObjects(value: string[]): equipmentTableRowDataForAUTOTT {
    return {
        name: value[0] ?? '',
        maxWeight: value[1] ?? '',
        liftCapability: value[2] ?? '',
        maxTwinWeightDifference: value[3] ?? '',
        provider: value[4] ?? '',
        url: value[5] ?? '',
        boundary: value[6] ?? ''
    };
}

export function mapAllValuesToARTGObjects(value: string[]): equipmentTableRowForARTG {
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

export function mapAllValuesToMSCObjects(value: string[]): equipmentTableRowDataForMSC {
    return {
        name: value[0] ?? '',
        maxWeight: value[1] ?? '',
        liftCapability: value[2] ?? '',
        maxTwinWeightDifference: value [3] ?? '',
        maxTierHeight: value [4] ?? '',
        softwareVersion: value [5] ?? '',
        hostName: value [6] ?? '',
        portNumber: value [7] ?? '',
        boundary: value[8] ?? '',
    };
}

export function mapAllValuesToRailGantryCraneObjects(value: string[]): equipmentTableRowForRAILGANTRYCRANE {
    return {
        name: value[0] ?? '',
        length: value[1] ?? '',
        width: value[2] ?? '',
        maxWeight: value[3] ?? '',
        liftCapability: value[4] ?? '',
        maxTwinWeightDifference: value [5] ?? '',
        maxTierHeight: value [6] ?? '',
        softwareVersion: value [7] ?? '',
        hostName: value [8] ?? '',
        automationPort: value[9] ?? '',
        stackProfilingPort: value [10] ?? '',
        craneId: value[11] ?? '',
        boundary: value[12] ?? '',
    };
}

export function mapAllValuesToTerminalTruckObjects(value: string[]): equipmentTableRowDataForTERMINALTRUCK {
    return {
        name: value[0] ?? '',
        maxWeight: value[1] ?? '',
        liftCapability: value[  2] ?? '',
        maxTwinWeightDifference: value [3] ?? '',
        maxTierHeight: value [4] ?? '',
        softwareVersion: value [5] ?? '',
        defaultPosition: value[6] ?? '',
        boundary: value[7] ?? '',
    };
}


