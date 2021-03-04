import { Context } from "../../objects";
import { ViewerTargetTargets } from "../../objects/types";

export async function updateViewerTargetTargetsViewerIDQuery(
    context: Context,
    id: string,
    viewerID: string,
): Promise<null | ViewerTargetTargets> {

    const viewerTargetTargetsDb = await context.databaseApi.queries.updateVTTViewerID(id, viewerID);
    return viewerTargetTargetsDb === null ? null : ViewerTargetTargets.builderFromDb(viewerTargetTargetsDb.get());

}

export async function updateViewerTargetTargetsTargetIDQuery(
    context: Context,
    id: string,
    targetID: string,
): Promise<null | ViewerTargetTargets> {

    const viewerTargetTargetsDb = await context.databaseApi.queries.updateVTTTargetID(id, targetID);
    return viewerTargetTargetsDb === null ? null : ViewerTargetTargets.builderFromDb(viewerTargetTargetsDb.get());

}

