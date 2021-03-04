import { Context } from "../../objects";
import { Viewer } from "../../objects/types";

export async function createViewerQuery(
    context: Context,
    identifier: string,
): Promise<Viewer> {

    const viewerDb = await context.databaseApi.queries.createViewer({
        identifier,
    });
    return Viewer.builderFromDb(viewerDb.get());

}
