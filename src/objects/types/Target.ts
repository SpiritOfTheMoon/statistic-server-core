import { TargetAttributes } from "@umk-stat/statistic-server-database";
import {Ctx, Field, ObjectType, UseMiddleware} from "type-graphql";
import { Node } from "../interface";
import {viewerEventLoaderInit} from "../../middleware/viewerEventLoaderInit";
import {Context} from "../Context";
import {getHashArgs} from "../../functions/getHashArgs";
import {System} from "./System";
import {systemTargetLoaderInit} from "../../middleware/systemTargetLoaderInit";

@ObjectType({
    implements: Node,
    simpleResolvers: true,
})
export class Target implements Node {

    public static builderFromDb(object: TargetAttributes): Target {

        const target = new Target();
        target.id = object.id;
        target.name = object.name;
        target.systemID = object.systemID;
        return target;

    }

    public id: string

    @Field(() => String, {
        nullable: false,
    })
    public name: string

    @Field(() => String, {
        nullable: false,
    })
    public systemID: string

    @UseMiddleware(systemTargetLoaderInit)
    @Field(() => System, {
        nullable: false,
    })
    public async system(

        @Ctx()
            context: Context,

    ): Promise<System> {

        const id = this.systemID;
        const eventType = "systemTargetLoader";
        const hash = getHashArgs([]);
        return context.dataLoadersMap.get(eventType)?.get(hash)?.load(id);

    }
}
