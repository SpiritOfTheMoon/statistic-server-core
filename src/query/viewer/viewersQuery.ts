import { Context } from "../../objects";
import { Viewer } from "../../objects/types";

export async function viewersQuery(
    context: Context
): Promise<Viewer[]> {

    const viewersDb = await context.databaseApi.queries.findViewers();
    return viewersDb.map((viewerDb) => Viewer.builderFromDb(viewerDb.get()));

}
