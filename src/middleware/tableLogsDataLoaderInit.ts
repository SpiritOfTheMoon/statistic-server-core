import { MiddlewareFn } from "type-graphql";
import { Context } from "../objects/Context";
import DataLoader from "dataloader";
import { BackendLog } from "../objects/types";
import { Edgable } from "../objects/genericObjects/Edge";
import { validateConnectionArgsOrder } from "../functions/validateConnectionArgsOrder";
import { ConnectionArgsOrder } from "../objects/args/ConnectionArgsOrder";
import { decodeToBase64 } from "../decode/decodeToBase64";
import { setLoaderToContext } from "../functions/setLoaderToContext";

export const tableLogsDataLoaderInit: MiddlewareFn<Context> = (
    { context, args },
    next,
) => {
    const middlewareType = "tableLogsDataLoader";
    const { limit, offset, order, orderField, orderRowNumber } = validateConnectionArgsOrder(args as ConnectionArgsOrder);

    const batchFn: DataLoader.BatchLoadFn<string, Edgable<BackendLog>[]> = async (keys: string[]): Promise<Edgable<BackendLog>[][]> => {

        const backendLogsDb = await context.databaseApi.queries.findBackendLogsConnection(keys, limit, offset, orderField, orderRowNumber, order);
        const logsMap = backendLogsDb.reduce((prev, val) => {

            const prevArrayEdgable = prev.get(val.systemId);
            const newArrayEdgable: Edgable<BackendLog>[] = [];
            if (typeof prevArrayEdgable !== "undefined") {

                newArrayEdgable.push(...prevArrayEdgable);

            }
            newArrayEdgable.push({
                cursor: decodeToBase64(val.rowNumber.toString()),
                node: BackendLog.builderFromDb(val),
            });
            prev.set(val.systemId, newArrayEdgable);
            return prev;

        }, new Map<string, Edgable<BackendLog>[]>());

        const logs = keys.map((key) => {

            const arrayEdgable = logsMap.get(key);
            if (typeof arrayEdgable === "undefined") {

                return [];

            }
            return arrayEdgable;

        });

        return logs;

    }
    const newLoader = new DataLoader(batchFn);

    setLoaderToContext(args, middlewareType, newLoader, context);

    const nextResult = next();
    return nextResult;

}
