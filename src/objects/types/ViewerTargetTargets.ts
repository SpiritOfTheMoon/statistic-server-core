import { ViewerTargetTargetsAttributes } from "@umk-stat/statistic-server-database";
import {
    Ctx, Field, ObjectType, UseMiddleware,
} from "type-graphql";
import { Node } from "../interface";
import { Context } from "../Context";
import { getHashArgs } from "../../functions/getHashArgs";
import { targetViewerTargetTargetsLoaderInit } from "../../middleware/targetViewerTargetTargetsLoaderInit";
import { viewerViewerTargetTargetsLoaderInit } from "../../middleware/viewerViewerTargetTargetsLoaderInit";
import { Target } from "./Target";
import { Viewer } from "./Viewer";

@ObjectType({
    implements: Node,
    simpleResolvers: true,
})
export class ViewerTargetTargets implements Node {

    public static builderFromDb(object: ViewerTargetTargetsAttributes): ViewerTargetTargets {

        const viewerTargetTargets = new ViewerTargetTargets();
        viewerTargetTargets.id = object.id;
        viewerTargetTargets.targetID = object.targetID;
        viewerTargetTargets.viewerID = object.viewerID;
        return viewerTargetTargets;

    }

    public id: string

    @Field(() => String, {
        nullable: false,
    })
    public targetID: string

    @Field(() => String, {
        nullable: false,
    })
    public viewerID: string

    @UseMiddleware(targetViewerTargetTargetsLoaderInit)
    @Field(() => Target, {
        nullable: false,
    })
    public async target(

        @Ctx()
            context: Context,


    ): Promise<Target> {

        const id = this.targetID;
        const eventType = "targetViewerTargetTargetsLoader";
        const hash = getHashArgs([]);

        return context.dataLoadersMap.get(eventType)?.get(hash)?.load(id);

    }

    @UseMiddleware(viewerViewerTargetTargetsLoaderInit)
    @Field(() => Viewer, {
        nullable: false,
    })
    public async viewer(

        @Ctx()
            context: Context,


    ): Promise<Viewer> {

        const id = this.viewerID;
        const eventType = "viewerViewerTargetTargetsLoader";
        const hash = getHashArgs([]);

        return context.dataLoadersMap.get(eventType)?.get(hash)?.load(id);

    }

}
