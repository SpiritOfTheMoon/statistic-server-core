import {
    Resolver, Query, Ctx, Arg, Mutation,
} from "type-graphql";
import {
    systemTargetTargetsQuery, systemTargetTargetssQuery, createViewerTargetTargetsQuery,
    updateSystemTargetTargetsSystemIDQuery, updateSystemTargetTargetsTargetIDQuery,
    deleteSystemTargetTargetsQuery, deleteSystemTargetTargetssQuery,
} from "../query/systemTargetTargets";
import { SystemTargetTargets } from "../objects/types";
import { Context } from "../objects";

@Resolver()
export class SystemTargetTargetsResolver {

    @Mutation(() => SystemTargetTargets, {
        nullable: false,
    })
    public async createSystemTargetTargets(
        @Ctx()
            context: Context,
        @Arg("targetID", {
            nullable: false,
        })
            targetID: string,
        @Arg("systemID", {
            nullable: false,
        })
            systemID: string,
    ): Promise<SystemTargetTargets> {

        return createViewerTargetTargetsQuery(context, targetID, systemID);

    }

    @Query(() => SystemTargetTargets, {
        nullable: true,
    })
    public async systemTargetTargets(
        @Ctx()
            context: Context,

        @Arg("id", {
            nullable: false,
        })
            id: string,
    ): Promise<SystemTargetTargets | null> {

        return systemTargetTargetsQuery(context, id);

    }

    @Query(() => [SystemTargetTargets], {
        nullable: false,
    })
    public async systemTargetTargetss(
        @Ctx()
            context: Context,
    ): Promise<SystemTargetTargets[]> {

        return systemTargetTargetssQuery(context);

    }

    @Mutation(() => SystemTargetTargets, {
        nullable: false,
    })
    public async updateSystemTargetTargetsSystemID(
        @Ctx()
            context: Context,

        @Arg("id", {
            nullable: false,
        })
            id: string,

        @Arg("systemID", {
            nullable: false,
        })
            systemID: string,
    ): Promise<SystemTargetTargets | null> {

        return updateSystemTargetTargetsSystemIDQuery(context, id, systemID);

    }

    @Mutation(() => SystemTargetTargets, {
        nullable: false,
    })
    public async updateSystemTargetTargetsTargetID(
        @Ctx()
            context: Context,

        @Arg("id", {
            nullable: false,
        })
            id: string,

        @Arg("targetID", {
            nullable: false,
        })
            targetID: string,
    ): Promise<SystemTargetTargets | null> {

        return updateSystemTargetTargetsTargetIDQuery(context, id, targetID);

    }

    @Mutation(() => SystemTargetTargets, {
        nullable: false,
    })
    public async deleteSystemTargetTargets(
        @Ctx()
            context: Context,

        @Arg("id", {
            nullable: false,
        })
            id: string,
    ): Promise<SystemTargetTargets | null> {

        return deleteSystemTargetTargetsQuery(context, id);

    }

    @Mutation(() => [SystemTargetTargets], {
        nullable: false,
    })
    public async deleteSystemTargetTargetss(
        @Ctx()
            context: Context,
    ): Promise<SystemTargetTargets[]> {

        return deleteSystemTargetTargetssQuery(context);

    }

}
