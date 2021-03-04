import { MiddlewareFn } from "type-graphql";
import DataLoader from "dataloader";
import { Context } from "../objects";
import { setLoaderToContext } from "../functions/setLoaderToContext";
import { targetQuery } from "../query/target";
import { Target } from "../objects/types";

export const targetSystemTargetTargetsLoaderInit: MiddlewareFn<Context> = (
    { context, args },
    next
) => {

    const middlewareType = "targetSystemTargetTargetsLoader";

    const batchFn: (ids: string[]) => Promise<(Target | null)[]> =  async (ids: string[])
        : Promise<(null | Target)[]> => {

        return await Promise.all(ids.map(id => targetQuery(context, id)));

    };

    const newLoader = new DataLoader(batchFn);

    setLoaderToContext(args, middlewareType, newLoader, context);

    return next();

}
