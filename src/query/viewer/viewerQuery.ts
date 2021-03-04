import { Context } from "../../objects";
import { Viewer } from "../../objects/types";

export async function viewerQuery(
    context: Context,
    id: string,
): Promise<Viewer | null> {

    const viewerDb = await context.databaseApi.queries.findViewer(id);
    return viewerDb === null ? null : Viewer.builderFromDb(viewerDb.get());

}
