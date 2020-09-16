import { MiddlewareFn } from "type-graphql";
import { Context } from "../objects/Context";
import DataLoader from "dataloader";
import { setLoaderToContext } from "../functions/setLoaderToContext";

export const countTableLogsDataLoaderInit: MiddlewareFn<Context> = (
    { context, args },
    next,
) => {
    const middlewareType = "countTableLogsDataLoader";


    const batchFn: DataLoader.BatchLoadFn<string, number> = (keys: string[]): Promise<number[]> => {

        const counts = context.databaseApi.queries.countBackendLogs(keys);
        return counts;

    };

    const newLoader = new DataLoader(batchFn);

    setLoaderToContext(args, middlewareType, newLoader, context);

    const nextResult = next();
    return nextResult;
};
