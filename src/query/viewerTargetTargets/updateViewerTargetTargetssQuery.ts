import { Context } from "../../objects";
import { ViewerTargetTargets } from "../../objects/types";

export async function updateViewerTargetTargetsViewerIDQuery(
    context: Context,
    id: string,
    viewerID: string,
    targetID: string,
): Promise<null | ViewerTargetTargets> {

    const viewerTargetTargetsDb = await context.databaseApi.queries.updateViewerTargetTargets(id, viewerID, targetID);
    return viewerTargetTargetsDb === null ? null : ViewerTargetTargets.builderFromDb(viewerTargetTargetsDb.get());

}


