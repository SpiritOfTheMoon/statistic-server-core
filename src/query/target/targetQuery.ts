import { Context } from "../../objects";
import { Target } from "../../objects/types";

export async function targetQuery(
    context: Context,
    id: string,
): Promise<Target | null> {

    const targetDb = await context.databaseApi.queries.findTarget(id);
    return targetDb === null ? null : Target.builderFromDb(targetDb.get());

}
