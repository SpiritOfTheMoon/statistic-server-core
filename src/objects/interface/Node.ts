import {
    Field, InterfaceType, ID, TypeResolver,
} from "type-graphql";
import { Context } from "../types/Context";

const NodeResolveType: TypeResolver<Node, Context> = (value, context) => {

    if (value === null) {
        return undefined;
    }

    return value.constructor.name;

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
