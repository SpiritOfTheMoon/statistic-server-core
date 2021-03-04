import { Context } from "../../objects";
import { SystemTargetTargets } from "../../objects/types";

export async function systemTargetTargetssQuery(
    context: Context
): Promise<SystemTargetTargets[]> {

    const systemsTTDb = await context.databaseApi.queries.findSystemTargetTargetss();
    return systemsTTDb.map((systemTTDb) => SystemTargetTargets.builderFromDb(systemTTDb.get()));

}
