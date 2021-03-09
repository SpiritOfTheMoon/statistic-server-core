import {MiddlewareFn} from "type-graphql";
import {Context, Viewer} from "../objects";
import DataLoader from "dataloader";
import { setLoaderToContext } from "../functions/setLoaderToContext";
import { viewerQuery } from "../query/viewer";

export const viewerViewerTargetTargetsLoaderInit: MiddlewareFn<Context> = (
    { context, args },
    next
) => {

    const middlewareType = "viewerViewerTargetTargetsLoader";

    const batchFn: (ids: string[]) => Promise<(Viewer | null)[]> =  async (ids: string[])
        : Promise<(null | Viewer)[]> => {

        return await Promise.all(ids.map(id => viewerQuery(context, id)));

    };

    const newLoader = new DataLoader(batchFn);

    setLoaderToContext(args, middlewareType, newLoader, context);

    return next();

}
