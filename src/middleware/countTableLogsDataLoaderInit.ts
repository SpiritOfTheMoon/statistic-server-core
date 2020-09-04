import { MiddlewareFn } from "type-graphql";
import { Context } from "../objects/Context";
import DataLoader from "dataloader";

export const countTableLogsDataLoaderInit: MiddlewareFn<Context> = (
    { context },
    next,
) => {


    if (!context.countTableLogsDataLoader) {

        const batchFn: DataLoader.BatchLoadFn<string, number> = (keys: string[]): Promise<number[]> => {

            const counts = context.databaseApi.queries.countBackendLogs(keys);
            return counts;

        };

        context.countTableLogsDataLoader = new DataLoader<string, number>(batchFn);

    }
    return next();

};
