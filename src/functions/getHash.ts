import { createHash } from "crypto";


export function getHash(data: string): string {

    const hash = createHash("sha256").update(data).digest().toString();
    return hash;

}