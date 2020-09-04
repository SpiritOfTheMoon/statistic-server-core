import "reflect-metadata";
import { registerEnumType, EnumResolver} from "type-graphql";

export enum Period {

    Day = "DAY", 
    Month = "MONTH",
    Year = "YEAR",
    CustomDate = "CUSTOM_DATE"


}

registerEnumType(Period, {
    name: "Topics",
});
