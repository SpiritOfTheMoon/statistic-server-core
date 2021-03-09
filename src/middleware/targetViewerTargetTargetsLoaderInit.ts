import {MiddlewareFn} from "type-graphql";
import {Context, Target} from "../objects";
import DataLoader from "dataloader";
import { setLoaderToContext } from "../functions/setLoaderToContext";
import { targetQuery } from "../query/target";

export const targetViewerTargetTargetsLoaderInit: MiddlewareFn<Context> = (
    { context, args },
    next
) => {

    const middlewareType = "targetViewerTargetTargetsLoader";

    const batchFn: (ids: string[]) => Promise<(Target | null)[]> =  async (ids: string[])
        : Promise<(null | Target)[]> => {

        return await Promise.all(ids.map(id => targetQuery(context, id)));

    };

    const newLoader = new DataLoader(batchFn);

    setLoaderToContext(args, middlewareType, newLoader, context);

    return next();

}
