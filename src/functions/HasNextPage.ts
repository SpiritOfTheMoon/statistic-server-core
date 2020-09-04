import { decodeStringFromBase64 } from "../decode/decodeStringFromBase64";
import { ConnectionArgs } from "../objects/args/ConnectionArgs";

export function HasNextPage(totalCount: number, { first, before, last, after }: ConnectionArgs): boolean {

    if (first !== null) {

        if (after !== null) {

            const afterNumber: number = decodeStringFromBase64(after);
            if (totalCount - afterNumber - first > 0) {

                return true;

            }
            return false;

        }
        if (totalCount > first) {

            return true;

        }
        return false;


    }
    if (last !== null) {

        if (before !== null) {

            const beforeNumber: number = decodeStringFromBase64(before);
            if (totalCount > beforeNumber) {

                return true;

            }
            return false;

        }
        return false;

    }
    return false;

}
