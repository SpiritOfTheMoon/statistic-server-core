import {
    Resolver, Query, Ctx, Arg, Mutation,
} from "type-graphql";
import {
    viewerQuery, viewersQuery, createViewerQuery,
    updateViewerQuery, deleteViewerQuery, deleteViewersQuery,
} from "../query/viewer";
import { Viewer } from "../objects/types";
import { Context } from "../objects";

@Resolver()
export class ViewerResolver {

    @Mutation(() => Viewer, {
        nullable: false,
    })
    public async createViewer(
        @Ctx()
            context: Context,
        @Arg("identifier", {
            nullable: false,
        })
            identifier: string,

        @Arg("userInfo", {
            nullable: false,
        })
            userInfo: string,

        @Arg("compInfo", {
            nullable: false,
        })
            compInfo: string,
    ): Promise<Viewer> {

        return createViewerQuery(context, identifier, userInfo, compInfo);

    }

    @Query(() => Viewer, {
        nullable: true,
    })
    public async viewer(
        @Ctx()
            context: Context,

        @Arg("id", {
            nullable: false,
        })
            id: string,
    ): Promise<Viewer | null> {

        return viewerQuery(context, id);

    }

    @Query(() => [Viewer], {
        nullable: false,
    })
    public async viewers(
        @Ctx()
            context: Context,
    ): Promise<Viewer[]> {

        return viewersQuery(context);

    }

    @Mutation(() => Viewer, {
        nullable: true,
    })
    public async updateViewer(
        @Ctx()
            context: Context,

        @Arg("id", {
            nullable: false,
        })
            id: string,

        @Arg("identifier", {
            nullable: true,
        })
            identifier: string,

        @Arg("userInfo", {
            nullable: true,
        })
            userInfo: string,

        @Arg("compInfo", {
            nullable: true,
        })
            compInfo: string,
    ): Promise<Viewer | null> {

        return updateViewerQuery(context, id, identifier, userInfo, compInfo);

    }

    @Mutation(() => Viewer, {
        nullable: true,
    })
    public async deleteViewer(
        @Ctx()
            context: Context,

        @Arg("id", {
            nullable: false,
        })
            id: string,
    ): Promise<Viewer | null> {

        return deleteViewerQuery(context, id);

    }

    @Mutation(() => [Viewer], {
        nullable: false,
    })
    public async deleteViewers(
        @Ctx()
            context: Context,
    ): Promise<Viewer[]> {

        return deleteViewersQuery(context);

    }

}
