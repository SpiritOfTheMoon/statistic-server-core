import { EventAttributes } from "@umk-stat/statistic-server-database";
import {
    Ctx, Field, ObjectType, UseMiddleware
} from "type-graphql";
import { Node } from "../interface";
import { Context } from "../Context";
import { getHashArgs } from "../../functions/getHashArgs";
import { targetEventLoaderInit } from "../../middleware/targetEventLoaderInit";
import { viewerEventLoaderInit } from "../../middleware/viewerEventLoaderInit";
import { Target } from "./Target";
import { Viewer } from "./Viewer";

@ObjectType({
    implements: Node,
    simpleResolvers: true,
})
export class Event implements Node {

    public static builderFromDb(object: EventAttributes): Event {

        const event = new Event();
        event.id = object.id;
        event.name = object.name;
        event.targetID = object.targetID;
        event.viewerID = object.viewerID;
        event.time = object.time;
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

    @Field(() => String, {
        nullable: false,
    })
    public viewerID: string

    @Field(() => Date, {
        nullable: false,
    })
    public time: Date

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

    @UseMiddleware(viewerEventLoaderInit)
    @Field(() => Viewer, {
        nullable: false,
    })
    public async viewer(

        @Ctx()
            context: Context,

    ): Promise<Viewer> {

        const id = this.viewerID;
        const eventType = "viewerEventLoader";
        const hash = getHashArgs([]);
        return context.dataLoadersMap.get(eventType)?.get(hash)?.load(id);

    }
}
