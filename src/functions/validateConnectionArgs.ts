import { decodeCursorNull } from "../decode/decodeCursorNull";
import { ConnectionArgs } from "../objects/args/ConnectionArgs";

export function validateConnectionArgs(typeArgs: ConnectionArgs): {
    limit: number;
    offset: number;
} {

    if (typeArgs.after !== null && typeArgs.before !== null) {

        const error = new Error("Неправильные аргументы есть и before и after");
        throw error;

    }
    if (typeArgs.after !== null && typeArgs.last !== null) {

        const error = new Error("Неправильные аргументы есть и after и last");
        throw error;

    }
    if (typeArgs.before !== null && typeArgs.first !== null) {

        const error = new Error("Неправильные аргументы есть и before и first");
        throw error;

    }

    if (typeArgs.last !== null && typeArgs.first !== null) {

        const error = new Error("Неправильные аргументы есть и last и first");
        throw error;

    }

    // декодирование
    const after: number | null = decodeCursorNull(typeArgs.after);
    const before: number | null = decodeCursorNull(typeArgs.before);

    let limit = 7;
    let offset = 0;
    if (typeArgs.first !== null) {

        limit = typeArgs.first;
        if (after !== null) {

            offset = after;

        }

    }
    if (typeArgs.last !== null) {

        limit = typeArgs.last;
        if (before !== null) {

            offset = before - typeArgs.last - 1;

        }

    }
    return {
        limit,
        offset,
    };

}
