import {MiddlewareFn} from "type-graphql";
import DataLoader from "dataloader";
import {Context} from "../objects";
import {setLoaderToContext} from "../functions/setLoaderToContext";
import {systemQuery} from "../query/system/systemQuery";
import {System} from "../objects/types";

export const systemTargetLoaderInit: MiddlewareFn<Context> = (
    { context, args },
    next
) => {

    const middlewareType = "systemTargetLoader";

    const batchFn: (ids: string[]) => Promise<(System | null)[]> =  async (ids: string[])
        : Promise<(null | System)[]> => {
        return await Promise.all(ids.map(id => systemQuery(context, id)));

    };

    const newLoader = new DataLoader(batchFn);

    setLoaderToContext(args, middlewareType, newLoader, context);

    return next();

}
