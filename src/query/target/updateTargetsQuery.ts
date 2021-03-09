import { Context } from "../../objects";
import { Target } from "../../objects/types";

export async function updateTargetQuery(
    context: Context,
    id: string,
    name: string,
    systemID: string,
): Promise<Target | null> {

    const targetDb = await context.databaseApi.queries.updateTarget(id, name, systemID);
    return targetDb === null ? null : Target.builderFromDb(targetDb.get());

}
