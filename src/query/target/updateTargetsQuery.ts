import { Context } from "../../objects";
import { Target } from "../../objects/types";

export async function updateTargetNameQuery(
    context: Context,
    id: string,
    name: string,
): Promise<Target | null> {

    const targetDb = await context.databaseApi.queries.updateTargetName(id, name);
    return targetDb === null ? null : Target.builderFromDb(targetDb.get());

}
