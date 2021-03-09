import { Context } from "../../objects";
import { Target } from "../../objects/types";

export async function createTargetQuery(
    context: Context,
    name: string,
    systemID: string,
): Promise<Target> {

    const targetDb = await context.databaseApi.queries.createTarget({ 
        name,
        systemID,
    });
    return Target.builderFromDb(targetDb.get());

}
