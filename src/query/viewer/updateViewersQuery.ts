import { Context } from "../../objects";
import { Viewer } from "../../objects/types";

export async function updateViewerIdentifierQuery(
    context: Context,
    id: string,
    identifier: string,
): Promise<Viewer | null> {

    const viewerDb = await context.databaseApi.queries.updateViewerIdentifier(id, identifier);
    return viewerDb === null ? null : Viewer.builderFromDb(viewerDb.get());
}
