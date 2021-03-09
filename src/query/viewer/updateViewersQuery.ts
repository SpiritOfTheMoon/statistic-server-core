import { Context } from "../../objects";
import { Viewer } from "../../objects/types";

export async function updateViewerQuery(
    context: Context,
    id: string,
    identifier: string,
    userInfo: string,
    compInfo: string
): Promise<Viewer | null> {

    const viewerDb = await context.databaseApi.queries.updateViewer(id, identifier, userInfo, compInfo);
    return viewerDb === null ? null : Viewer.builderFromDb(viewerDb.get());
}
