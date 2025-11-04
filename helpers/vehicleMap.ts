export const vehicleFieldMap: Record<string, string[]> = {
    AGV: ['name', 'maxWeight', 'softwareVersion', 'hostName', 'portNumber', 'twentyFeetContainerOffset'],
    A_RTG: ['name', 'craneId', 'maxWeight', 'maxTierHeight', 'softwareVersion', 'hostName', 'portNumber', 'stackProfilingPort'],
    A_RMG: ['name', 'craneId', 'maxWeight', 'maxTierHeight', 'softwareVersion', 'hostName', 'portNumber'],
    A_STRAD: ['name', 'maxWeight', 'liftCapabilityTWIN', 'maxTwinHeightDiff', 'maxTierHeight', 'softwareVersion', 'hostName', 'portNumber'],
    MSC: ['name', 'maxWeight', 'maxTierHeight', 'softwareVersion', 'hostName', 'portNumber'],
    QC: ['name', 'maxWeight', 'softwareVersion', 'hostName', 'portNumber'],
    REMOTE_OPERATING_STATION: ['name', 'hostName', 'portNumber', 'protocolTypeNSc'],
};



