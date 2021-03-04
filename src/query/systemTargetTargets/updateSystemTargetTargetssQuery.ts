import { Context } from "../../objects";
import { SystemTargetTargets } from "../../objects/types";

export async function updateSystemTargetTargetsSystemIDQuery(
    context: Context,
    id: string,
    viewerID: string,
): Promise<null | SystemTargetTargets> {

    const systemTargetTargetsDb = await context.databaseApi.queries.updateSTTSystemID(id, viewerID);
    return systemTargetTargetsDb === null ? null : SystemTargetTargets.builderFromDb(systemTargetTargetsDb.get());

}

export async function updateSystemTargetTargetsTargetIDQuery(
    context: Context,
    id: string,
    targetID: string,
): Promise<null | SystemTargetTargets> {

    const systemTargetTargetsDb = await context.databaseApi.queries.updateSTTTargetID(id, targetID);
    return systemTargetTargetsDb === null ? null : SystemTargetTargets.builderFromDb(systemTargetTargetsDb.get());

}

