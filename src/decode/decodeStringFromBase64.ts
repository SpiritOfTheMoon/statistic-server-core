
export function decodeStringFromBase64(cursor: string): number {

    try {

        const res = Number(Buffer.from(cursor, "base64").toString());
        return res;

    } catch (err) {

        const error = new Error(`${(err as Error).message}, ошибка в декодировании курсоров-аргументов`);
        throw error;

    }

}
