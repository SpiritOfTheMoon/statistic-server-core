import { decodeStringFromBase64 } from "../decode/decodeStringFromBase64";
import { ConnectionArgs } from "../objects/args/ConnectionArgs";

export function HasPreviousPage(totalCount: number, { first, before, last, after }: ConnectionArgs): boolean {

    if (first !== null) {

        if (after !== null) {

            const afterNumber: number = decodeStringFromBase64(after);
            if (afterNumber - totalCount < first && afterNumber > 1) {

                return true;

            }
            return false;

        }
        return false;

    }
    if (last !== null) {

        if (before !== null) {

            const beforeNumber: number = decodeStringFromBase64(before);
            if (totalCount > beforeNumber - 2 * last) {

                return true;

            }
            return false;

        }
        if (totalCount <= last) {

            return false;

        }
        return true;


    }
    return false;

}
