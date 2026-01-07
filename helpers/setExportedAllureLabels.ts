import {severity as allureSeverity, tag as allureTag, label as allureLabel} from "allure-js-commons";

export async function setExportEquipmentLabels(
    severityLevel: string,
    tagName: string,
    labels: { name: string, value: string }[]
) {
    await allureSeverity(severityLevel);
    await allureTag(tagName);

    for (const label of labels) {
        await allureLabel(label.name, label.value);
    }
}

