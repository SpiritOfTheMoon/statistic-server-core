import { Context } from "../../objects";
import { SystemTargetTargets } from "../../objects/types";

export async function systemTargetTargetsQuery(
    context: Context,
    id: string,
): Promise<SystemTargetTargets | null> {

    const systemTargetTargetsDb = await context.databaseApi.queries.findSystemTargetTargets(id);
    return systemTargetTargetsDb === null ? null : SystemTargetTargets.builderFromDb(systemTargetTargetsDb.get());

}
