import { Context } from "../../objects";
import { Viewer } from "../../objects/types";

export async function deleteViewersQuery(
    context: Context
): Promise<Viewer[]> {

    const viewersDb = await context.databaseApi.queries.deleteViewers();
    return viewersDb.map((viewerDb) => Viewer.builderFromDb(viewerDb.get()));

}
