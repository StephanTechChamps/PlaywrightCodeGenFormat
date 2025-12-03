import {equipmentTableRowForAGV} from "../../pom/equipment/interfaces/equipmentTableRowDataForAGV";

export let expectedDataForEquipmentAGV: equipmentTableRowForAGV[] = [
    {
        name: 'AGV-TEST-01',
        maxWeight: '35000',
        liftCapability: 'HeavyLift',
        maxTwinWeightDifference: '500',
        softwareVersion: 'v1.2.3',
        hostName: 'agv-host.local',
        portNumber: '8080',
        SubType: 'TwinLift',
        protocolType: 'TCP/IP',
        energySourceType: 'Electric',
        chassisSpecification: 'StandardChassis',
        twentyContainerOffset: '2.5',
        boundary: 'Zone-A'
    },
    {
        name: 'AGV-TEST-02',
        maxWeight: '40000',
        liftCapability: 'LightLift',
        maxTwinWeightDifference: '300',
        softwareVersion: 'v2.0.0',
        hostName: 'agv02.local',
        portNumber: '9090',
        SubType: 'SingleLift',
        protocolType: 'UDP',
        energySourceType: 'Hybrid',
        chassisSpecification: 'ExtendedChassis',
        twentyContainerOffset: '3.0',
        boundary: 'Zone-B'
    }
];