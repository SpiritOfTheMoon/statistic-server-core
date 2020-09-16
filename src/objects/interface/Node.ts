import {
    Field, InterfaceType, ID, TypeResolver,
} from "type-graphql";
import { Context } from "../Context";
import { System, BackendLog } from "../types";

const NodeResolveType: TypeResolver<System | BackendLog, Context> = (value, context) => {

    const { id } = value;
    const num = id.substring(0, 3);
    const nameClass = context.graphQLObjectMap.get(num);
    if (typeof nameClass !== "undefined") {

        switch (nameClass) {

        case "System":
            return "System";
        case "BackendLogs":
            return "BackendLog";
        
        }

    }

    throw new Error("Неправильный id");

};


@InterfaceType({
    resolveType: NodeResolveType,
})
export abstract class Node {

    @Field(() => ID, {
        nullable: false,
        description: "Id",
    })
    public id: string;

}
