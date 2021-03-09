import { Context } from "../../objects";
import { ViewerTargetTargets } from "../../objects/types";

export async function deleteViewerTargetTargetsQuery(
    context: Context,
    id: string,
): Promise<null | ViewerTargetTargets> {

    const viewerTargetTargetsDb = await context.databaseApi.queries.deleteViewerTargetTargets(id);
    return viewerTargetTargetsDb === null ? null : ViewerTargetTargets.builderFromDb(viewerTargetTargetsDb.get());

}
