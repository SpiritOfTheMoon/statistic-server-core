import { registerEnumType } from "type-graphql";
export enum Datepart {
    year = "year",
    quarter = "quarter",
    month = "month",
    dayofyear = "dayofyear",
    day = "day",
    week = "week",
    weekday = "weekday",
    hour = "hour",
    minute = "minute",
    second = "second",
    millisecond = "millisecond",
    microsecond = "microsecond",
    nanosecond = "nanosecond"
}
registerEnumType(Datepart, {
    name: "Datepart",
    description: "Типы сортировки",
});
