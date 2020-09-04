import { decodeCursorNull } from "../decode/decodeCursorNull";
import { OrderType } from "../objects/enum/OrderType";
import { ConnectionArgsOrder } from "../objects/args/ConnectionArgsOrder";

export function validateConnectionArgsOrder(typeArgs: ConnectionArgsOrder): {
    limit: number;
    offset: number;
    order: OrderType;
    orderField: string;
    orderRowNumber: OrderType;
} {

    let { skip } = typeArgs;
    let order: OrderType = OrderType.ASC;
    let orderRowNumber: OrderType = OrderType.ASC;
    let orderField = "CreatedAt";
    if (typeArgs.order !== null) {

        order = typeArgs.order;
        orderRowNumber = typeArgs.order;

    }
    if (typeArgs.orderField !== null) {

        orderField = typeArgs.orderField;

    }
    if (typeArgs.after !== null && typeArgs.before !== null) {

        const error = new Error("Неправильные аргументы: есть и before и after");
        throw error;

    }
    if (typeArgs.after !== null && typeArgs.last !== null) {

        const error = new Error("Неправильные аргументы: есть и after и last");
        throw error;

    }
    if (typeArgs.before !== null && typeArgs.first !== null) {

        const error = new Error("Неправильные аргументы: есть и before и first");
        throw error;

    }

    if (typeArgs.last !== null && typeArgs.first !== null) {

        const error = new Error("Неправильные аргументы: есть и last и first");
        throw error;

    }


    // декодирование
    const after: number | null = decodeCursorNull(typeArgs.after);
    const before: number | null = decodeCursorNull(typeArgs.before);

    let limit = 7;
    if (skip === null){

        skip = 0;

    }
    let offset = skip;
    if (typeArgs.first !== null) {

        limit = typeArgs.first;
        if (after !== null) {

            offset += after;

        }

    }
    if (typeArgs.last !== null) {

        limit = typeArgs.last;
        if (before !== null) {

            offset += before - typeArgs.last - 1;

        } else if (order === OrderType.ASC) {

            order = OrderType.DESC;

        } else {

            order = OrderType.ASC;

        }

    }
    return {
        limit,
        offset,
        order,
        orderField,
        orderRowNumber,
    };

}
