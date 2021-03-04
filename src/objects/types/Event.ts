import { EventAttributesType } from "@umk-stat/statistic-server-database";
import {
    Ctx, Field, ObjectType, UseMiddleware
} from "type-graphql";
import { Node } from "../interface";
import { Context } from "../Context";
import { getHashArgs } from "../../functions/getHashArgs";
import { targetEventLoaderInit } from "../../middleware/targetEventLoaderInit";
import { Target } from "./Target";

@ObjectType({
    implements: Node,
    simpleResolvers: true,
})
export class Event implements Node {

    public static builderFromDb(object: EventAttributesType): Event {

        const event = new Event();
        event.id = object.id;
        event.name = object.name;
        event.targetID = object.targetID;
        return event;

    }

    public id: string

    @Field(() => String, {
        nullable: false,
    })
    public name: string

    @Field(() => String, {
        nullable: false,
    })
    public targetID: string

    @UseMiddleware(targetEventLoaderInit)
    @Field(() => Target, {
        nullable: false,
    })
    public async target(

        @Ctx()
            context: Context,

    ): Promise<Target> {

        const id = this.targetID;
        const eventType = "targetEventLoader";
        const hash = getHashArgs([]);
        return context.dataLoadersMap.get(eventType)?.get(hash)?.load(id);
    
    }
    
}
