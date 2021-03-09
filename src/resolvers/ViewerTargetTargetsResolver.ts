import {
    Resolver, Query, Ctx, Arg, Mutation,
} from "type-graphql";
import {
    viewerTargetTargetsQuery, viewerTargetTargetssQuery, createViewerTargetTargetsQuery,
    updateViewerTargetTargetsViewerIDQuery,
    deleteViewerTargetTargetsQuery, deleteViewerTargetTargetssQuery,
} from "../query/viewerTargetTargets";
import {Target, ViewerTargetTargets} from "../objects/types";
import { Context } from "../objects";

@Resolver()
export class ViewerTargetTargetsResolver {

    @Mutation(() => ViewerTargetTargets, {
        nullable: false,
    })
    public async createViewerTargetTargets(
        @Ctx()
            context: Context,
        @Arg("targetID", {
            nullable: false,
        })
            targetID: string,
        @Arg("viewerID", {
            nullable: false,
        })
            viewerID: string,
    ): Promise<ViewerTargetTargets> {

        return createViewerTargetTargetsQuery(context, targetID, viewerID);

    }

    @Query(() => ViewerTargetTargets, {
        nullable: true,
    })
    public async viewerTargetTargets(
        @Ctx()
            context: Context,

        @Arg("id", {
            nullable: false,
        })
            id: string,
    ): Promise<ViewerTargetTargets | null> {

        return viewerTargetTargetsQuery(context, id);

    }

    @Query(() => [ViewerTargetTargets], {
        nullable: false,
    })
    public async viewerTargetTargetss(
        @Ctx()
            context: Context,
    ): Promise<ViewerTargetTargets[]> {

        return viewerTargetTargetssQuery(context);

    }

    @Mutation(() => ViewerTargetTargets, {
        nullable: false,
    })
    public async updateViewerTargetTargetsViewerID(
        @Ctx()
            context: Context,

        @Arg("id", {
            nullable: false,
        })
            id: string,

        @Arg("viewerID", {
            nullable: true,
        })
            viewerID: string,

        @Arg("targetID", {
            nullable: true,
        })
            targetID: string,
    ): Promise<ViewerTargetTargets | null> {

        return updateViewerTargetTargetsViewerIDQuery(context, id, viewerID, targetID);

    }

    @Mutation(() => ViewerTargetTargets, {
        nullable: false,
    })

    @Mutation(() => ViewerTargetTargets, {
        nullable: false,
    })
    public async deleteViewerTargetTargets(
        @Ctx()
            context: Context,

        @Arg("id", {
            nullable: false,
        })
            id: string,
    ): Promise<ViewerTargetTargets | null> {

        return deleteViewerTargetTargetsQuery(context, id);

    }

    @Mutation(() => [ViewerTargetTargets], {
        nullable: false,
    })
    public async deleteViewerTargetTargetss(
        @Ctx()
            context: Context,
    ): Promise<ViewerTargetTargets[]> {

        return deleteViewerTargetTargetssQuery(context);

    }

}
