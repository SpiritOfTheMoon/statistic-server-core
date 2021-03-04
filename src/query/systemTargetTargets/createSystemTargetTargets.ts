import { Context } from "../../objects";
import { SystemTargetTargets } from "../../objects/types";

export async function createViewerTargetTargetsQuery(
    context: Context,
    targetID: string,
    systemID: string
): Promise<SystemTargetTargets> {

    const systemTargetTargetsDb = await context.databaseApi.queries.createSystemTargetTargets({
        targetID,
        systemID,
    });
    return SystemTargetTargets.builderFromDb(systemTargetTargetsDb.get());

}
