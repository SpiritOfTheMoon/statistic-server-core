import { MiddlewareFn } from "type-graphql";
import { Context } from "../objects/Context";
import DataLoader from "dataloader";
import { QueryReportType } from "../objects/types";
import { PeriodArgs } from "../objects/args";

export const queryLoaderInit: MiddlewareFn<Context> = (
    { context, args },
    next,
) => {

    const { begin, end } = args as PeriodArgs;
    if (!context.queryLoader) {

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
        context.queryLoader = new DataLoader<string, QueryReportType[]>(batchFn);

    }
    return next();

};
