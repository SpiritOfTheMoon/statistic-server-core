import "reflect-metadata";
import { registerEnumType, EnumResolver} from "type-graphql";

export enum Topics {

    BackendLogs = "BACKEND_LOGS", 

}

registerEnumType(Topics, {
    name: "Topics",
});
