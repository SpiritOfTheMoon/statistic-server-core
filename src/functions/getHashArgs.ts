import { ArgsDictionary } from "type-graphql";
import { getHash } from "./getHash";

export function getHashArgs(args: ArgsDictionary): string {

    const trueArgs = Object
        .keys(args)
        .sort()
        .reduce((val, key) => {
            val[key] = args[key];
            return val;
        }, {});
    const argsString = JSON.stringify(trueArgs);
    const hash = getHash(argsString);
    return hash;

}