import {Context} from "../../objects/Context";
import { BackendLog } from "../../objects/types";

export async function backendLogQuery(
    context: Context,
    id: string,
): Promise<BackendLog | null> {

    const backendLogDb = await context.databaseApi.queries.findBackendLog(id);
    const backendLog = backendLogDb === null ? null : BackendLog.builderFromDb(backendLogDb.get());
    return backendLog;
 
}
