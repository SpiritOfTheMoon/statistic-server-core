import { ArgsDictionary } from "type-graphql";
import DataLoader from "dataloader";
import { Context } from "../objects/Context";
import { getHash } from "./getHash";
import { getHashArgs } from "./getHashArgs";

export function setLoaderToContext<K, V, C>(args: ArgsDictionary, middlewareType: string, newLoader: DataLoader<K, V, C>, context: Context) {

    const hash = getHashArgs(args);
    let loaders = context.dataLoadersMap.get(middlewareType);


    if (typeof loaders !== "undefined") {

        const loader = loaders.get(hash);

        if (typeof loader === "undefined") {

            loaders.set(hash, newLoader);
            context.dataLoadersMap.set(middlewareType, loaders);

        }

    } else {

        loaders = new Map<string, DataLoader<K, V, C>>();
        loaders.set(hash, newLoader);
        context.dataLoadersMap.set(middlewareType, loaders);

    }

}