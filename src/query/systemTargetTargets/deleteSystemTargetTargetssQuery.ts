import { Context } from "../../objects";
import { SystemTargetTargets } from "../../objects/types";

export async function deleteSystemTargetTargetssQuery(
    context: Context
): Promise<SystemTargetTargets[]> {

    const systemTargetTargetssDb = await context.databaseApi.queries.deleteSystemTargetTargetss();
    return systemTargetTargetssDb
        .map((systemTargetTargetsDb) => SystemTargetTargets.builderFromDb(systemTargetTargetsDb.get()));

}
