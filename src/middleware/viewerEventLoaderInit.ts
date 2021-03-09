import {MiddlewareFn} from "type-graphql";
import DataLoader from "dataloader";
import {Context} from "../objects";
import {setLoaderToContext} from "../functions/setLoaderToContext";
import {viewerQuery} from "../query/viewer";
import {Viewer} from "../objects/types";

export const viewerEventLoaderInit: MiddlewareFn<Context> = (
    { context, args },
    next
) => {

    const middlewareType = "viewerEventLoader";

    const batchFn: (ids: string[]) => Promise<(Viewer | null)[]> =  async (ids: string[])
        : Promise<(null | Viewer)[]> => {
        return await Promise.all(ids.map(id => viewerQuery(context, id)));

    };

    const newLoader = new DataLoader(batchFn);

    setLoaderToContext(args, middlewareType, newLoader, context);

    return next();

}
