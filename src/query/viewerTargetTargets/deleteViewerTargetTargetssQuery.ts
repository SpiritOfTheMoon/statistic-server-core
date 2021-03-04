import { Context } from "../../objects";
import { ViewerTargetTargets } from "../../objects/types";

export async function deleteViewerTargetTargetssQuery(
    context: Context
): Promise<ViewerTargetTargets[]> {

    const viewerTargetTargetssDb = await context.databaseApi.queries.deleteViewerTargetTargetss();
    return viewerTargetTargetssDb
        .map((viewerTargetTargetsDb) => ViewerTargetTargets.builderFromDb(viewerTargetTargetsDb.get()));

}
