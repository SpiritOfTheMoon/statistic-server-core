import { Context } from "../../objects";
import { Viewer } from "../../objects/types";

export async function createViewerQuery(
    context: Context,
    identifier: string,
    userInfo: string,
    compInfo: string,
): Promise<Viewer> {

    const viewerDb = await context.databaseApi.queries.createViewer({
        identifier,
        userInfo,
        compInfo,
    });
    return Viewer.builderFromDb(viewerDb.get());

}
