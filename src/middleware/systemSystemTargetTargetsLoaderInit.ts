import { MiddlewareFn } from "type-graphql";
import DataLoader from "dataloader";
import { Context } from "../objects";
import { setLoaderToContext } from "../functions/setLoaderToContext";
import { System } from "../objects/types";
import { systemQuery } from "../query/system/systemQuery";

export const systemSystemTargetTargetsLoaderInit: MiddlewareFn<Context> = (
    { context, args },
    next
) => {

    const middlewareType = "systemSystemTargetTargetsLoader";

    const batchFn: (ids: string[]) => Promise<(System | null)[]> =  async (ids: string[])
        : Promise<(null | System)[]> => {

        return await Promise.all(ids.map(id => systemQuery(context, id)));

    };

    const newLoader = new DataLoader(batchFn);

    setLoaderToContext(args, middlewareType, newLoader, context);

    return next();

}
