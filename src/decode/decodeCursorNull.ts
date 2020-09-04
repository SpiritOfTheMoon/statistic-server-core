
export function decodeCursorNull(cursor: string | null): number | null {

    try {

        const res: number | null = cursor !== null ? Number(Buffer.from(cursor, "base64").toString()) : null;
        return res;

    } catch (err) {

        const error = new Error(`${(err as Error).message}, ошибка в декодировании курсоров-аргументов`);
        throw error;

    }

}
