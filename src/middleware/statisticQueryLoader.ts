import { MiddlewareFn } from "type-graphql";
import { Context } from "../objects/Context";
import DataLoader from "dataloader";
import { setLoaderToContext } from "../functions/setLoaderToContext";
import { StatisticType } from "../objects";

export const statisticQueryLoader: MiddlewareFn<Context> = (
    { context, args },
    next,
) => {
    const middlewareType = "statisticQueryLoader";


    context.infoLogger.info(JSON.stringify(context.dataLoadersMap));
    const batchFn: DataLoader.BatchLoadFn<string, StatisticType> = async (keys: string[]): Promise<StatisticType[]> => {

        const counts = await context.databaseApi.queries.findStatisticDataByIdQuery(keys);

        return keys.map<StatisticType>((key) => {
            const q = counts.find((val) => val.id === key);
            if (typeof q === "undefined") {
                throw new Error();
            }
            return {
                average: q.expectedValue,
                count: q.count,
                fromDate: new Date(),
                toDate: new Date(),
                deviation: q.deviation,
                maxValue: q.maxValue,
            };
        });

    };

    const newLoader = new DataLoader(batchFn);

    setLoaderToContext(args, middlewareType, newLoader, context);

    const nextResult = next();
    return nextResult;
};
