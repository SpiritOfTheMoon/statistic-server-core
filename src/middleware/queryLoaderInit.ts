import { MiddlewareFn } from "type-graphql";
import { Context } from "../objects/Context";
import DataLoader from "dataloader";
import { QueryReportType } from "../objects/types";
import { PeriodArgs } from "../objects/args";
import { setLoaderToContext } from "../functions/setLoaderToContext";

export const queryLoaderInit: MiddlewareFn<Context> = (
    { context, args },
    next,
) => {

    const middlewareType = "queryLoader";
    const { begin, end } = args as PeriodArgs;


    const batchFn: DataLoader.BatchLoadFn<string, QueryReportType[]> = async (keys: string[]): Promise<QueryReportType[][]> => {

        const queries = await context.databaseApi.queries.findQueryAverage(keys, begin, end ?? new Date());
        return keys.map((key) => {

            return queries
                .filter((value) => value.systemId = key)
                .map<QueryReportType>((value) => ({
                    average: value.averageQueryPerfomance,
                    count: value.countQuery,
                    query: value.query,
                }));

        });

    };
    const newLoader = new DataLoader(batchFn);

    setLoaderToContext(args, middlewareType, newLoader, context);

    const nextResult = next();
    return nextResult;

};
