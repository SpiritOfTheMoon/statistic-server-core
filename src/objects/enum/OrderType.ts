import "reflect-metadata";
import { registerEnumType } from "type-graphql";

export enum OrderType {
    ASC = "ASC",
    DESC = "DESC",
}
registerEnumType(OrderType, {
    name: "OrderType",
    description: "Типы сортировки",
});
