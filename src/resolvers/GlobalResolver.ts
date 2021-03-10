import "reflect-metadata";
import {
    Resolver, Query, Arg, Ctx, Mutation, ID,
} from "type-graphql";
import { Context } from "../objects/types/Context";
import { Node } from "../objects/interface";
import { nodeQuery } from "../query/node/nodeQuery";


@Resolver()
export class GlobalResolver {

    @Query(() => Node, {
        nullable: true,
    })
    public async node(
        @Ctx()
            context: Context,

        @Arg("id", () => ID, {
            nullable: false,
        })
            id: string,
    ): Promise<Node | null> {

        return nodeQuery(context, id);

    }

}
