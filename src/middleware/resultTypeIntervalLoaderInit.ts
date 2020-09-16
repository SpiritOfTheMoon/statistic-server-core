import { MiddlewareFn } from "type-graphql";
import { Context } from "../objects/Context";
import DataLoader from "dataloader";
import { ResultTypeInterval, ResultType } from "../objects/types";
import { PeriodArgs } from "../objects/args";
import { Datepart } from "../objects/enum";
import { setLoaderToContext } from "../functions/setLoaderToContext";

export const resultTypeIntervalLoaderInit: MiddlewareFn<Context> = (
    { context, args },
    next,
) => {
    const middlewareType = "resultTypeIntervalLoader";
    const { begin, end, interval } = args as PeriodArgs & {
        interval: Datepart;
    };

    const batchFn: DataLoader.BatchLoadFn<string, ResultTypeInterval[]> = async (keys: string[]): Promise<ResultTypeInterval[][]> => {

        const intervalsDb = await context.databaseApi.queries.findResultTypeByIntervalsFromPeriod(keys, begin, end === null ? new Date() : end, interval);
        const setDate: Set<Date> = intervalsDb.reduce((prev, val) => {

            prev.add(val.onDate);
            return prev;

        }, new Set<Date>());
        const dates: Date[] = Array.from(setDate.values()).sort((a, b) => a <= b ? 1 : -1);
        return keys.map((key) =>
            dates.map<ResultTypeInterval>((date) => {

                const resultTypes = intervalsDb.filter((value) => value.id === key && value.onDate === date)
                    .map<ResultType>((value) => ({
                        name: value.resultType,
                        count: value.countResultType,
                    }));
                return {
                    date,
                    resultTypes,
                };

            }));

    };

    const newLoader = new DataLoader(batchFn);

    setLoaderToContext(args, middlewareType, newLoader, context);

    const nextResult = next();
    return nextResult;

}
