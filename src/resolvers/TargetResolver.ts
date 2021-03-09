import {
    Resolver, Query, Ctx, Arg, Mutation,
} from "type-graphql";
import {
    targetQuery, targetsQuery, createTargetQuery,
    updateTargetQuery, deleteTargetQuery, deleteTargetsQuery,
} from "../query/target";
import { Target} from "../objects/types";
import { Context } from "../objects";

@Resolver()
export class TargetResolver {

    @Mutation(() => Target, {
        nullable: false,
    })
    public async createTarget(
        @Ctx()
            context: Context,
        @Arg("name", {
            nullable: false,
        })
            name: string,
        @Arg("systemID", {
            nullable: false,
        })
            systemID: string,
    ): Promise<Target> {

        return createTargetQuery(context, name, systemID);

    }

    @Query(() => Target, {
        nullable: true,
    })
    public async target(
        @Ctx()
            context: Context,

        @Arg("id", {
            nullable: false,
        })
            id: string,
    ): Promise<Target | null> {

        return targetQuery(context, id);
    
    }

    @Query(() => [Target], {
        nullable: false,
    })
    public async targets(
        @Ctx()
            context: Context,
    ): Promise<Target[]> {

        return targetsQuery(context);

    }

    @Mutation(() => Target, {
        nullable: true,
    })
    public async updateTarget(
        @Ctx()
            context: Context,

        @Arg("id", {
            nullable: false,
        })
            id: string,

        @Arg("name", {
            nullable: true,
        })
            name: string,

        @Arg("systemID", {
            nullable: true,
        })
            systemID: string,
    ): Promise<Target | null> {

        return updateTargetQuery(context, id, name, systemID);

    }

    @Mutation(() => Target, {
        nullable: true,
    })
    public async deleteTarget(
        @Ctx()
            context: Context,

        @Arg("id", {
            nullable: false,
        })
            id: string,
    ): Promise<Target | null> {

        return deleteTargetQuery(context, id);

    }

    @Mutation(() => [Target], {
        nullable: false,
    })
    public async deleteTargets(
        @Ctx()
            context: Context,
    ): Promise<Target[]> {

        return deleteTargetsQuery(context);

    }

}

