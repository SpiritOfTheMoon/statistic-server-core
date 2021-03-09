import { Context } from "../../objects";
import { Target } from "../../objects/types";

export async function deleteTargetQuery(
    context: Context,
    id: string,
): Promise<Target | null> {

    const targetDb = await context.databaseApi.queries.deleteTarget(id);
    return targetDb === null ? null : Target.builderFromDb(targetDb.get());

}
