import { Context } from "../../objects";
import { SystemTargetTargets } from "../../objects/types";

export async function deleteSystemTargetTargetsQuery(
    context: Context,
    id: string,
): Promise<null | SystemTargetTargets> {

    const systemTargetTargetsDb = await context.databaseApi.queries.deleteSystemTargetTargets(id);
    return systemTargetTargetsDb === null ? null : SystemTargetTargets.builderFromDb(systemTargetTargetsDb.get());

}
