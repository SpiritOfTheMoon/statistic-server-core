import { MiddlewareFn } from "type-graphql";
import { Context } from "../objects/Context";
import DataLoader from "dataloader";
import { ResultType } from "../objects/types";
import { PeriodArgs } from "../objects/args";
import { setLoaderToContext } from "../functions/setLoaderToContext";

export const resultTypeReportLoaderInit: MiddlewareFn<Context> = (
    { context, args },
    next,
) => {
    const middlewareType = "resultTypeReportLoader";
    const { begin, end } = args as PeriodArgs;

    const batchFn: DataLoader.BatchLoadFn<string, ResultType[]> = async (keys: string[]): Promise<ResultType[][]> => {

        const resultDb = await context.databaseApi.queries.resultTypeReportDb(keys, begin, end === null ? new Date() : end);
        const mapResultDb = resultDb.reduce((prev, val) => {

            let arrResultType = prev.get(val.systemId);
            if (typeof arrResultType === "undefined") {

                arrResultType = [];

            }
            arrResultType.push({
                count: val.countResultType,
                name: val.resultType,
            });

            prev.set(val.systemId, arrResultType);
            return prev;

        }, new Map<string, ResultType[]>());

        return keys.map((key) => {

            const arr = mapResultDb.get(key);
            if (typeof arr === "undefined") {

                return [];

            }
            return arr;

        });

    };

    const newLoader = new DataLoader(batchFn);

    setLoaderToContext(args, middlewareType, newLoader, context);

    const nextResult = next();
    return nextResult;

};
