import { SystemTargetTargetsAttributesType } from "@umk-stat/statistic-server-database";
import {
    Ctx, Field, ObjectType, UseMiddleware,
} from "type-graphql";
import { Node } from "../interface";
import { Context } from "../Context";
import { getHashArgs } from "../../functions/getHashArgs";
import { targetSystemTargetTargetsLoaderInit } from "../../middleware/targetSystemTargetTargetsLoaderInit";
import { systemSystemTargetTargetsLoaderInit } from "../../middleware/systemSystemTargetTargetsLoaderInit";
import { Target } from "./Target";
import { System } from "./System";

@ObjectType({
    implements: Node,
    simpleResolvers: true,
})
export class SystemTargetTargets implements Node {

    public static builderFromDb(object: SystemTargetTargetsAttributesType): SystemTargetTargets {

        const systemTargetTargets = new SystemTargetTargets();
        systemTargetTargets.id = object.id;
        systemTargetTargets.targetID = object.targetID;
        systemTargetTargets.systemID = object.systemID;
        return systemTargetTargets;

    }

    public id: string

    @Field(() => String, {
        nullable: false,
    })
    public targetID: string

    @Field(() => String, {
        nullable: false,
    })
    public systemID: string

    @UseMiddleware(targetSystemTargetTargetsLoaderInit)
    @Field(() => Target, {
        nullable: false,
    })
    public async target(

        @Ctx()
            context: Context,


    ): Promise<Target> {

        const id = this.targetID;
        const eventType = "targetSystemTargetTargetsLoader";
        const hash = getHashArgs([]);

        return context.dataLoadersMap.get(eventType)?.get(hash)?.load(id);

    }

    @UseMiddleware(systemSystemTargetTargetsLoaderInit)
    @Field(() => System, {
        nullable: false,
    })
    public async system(

        @Ctx()
            context: Context,

    ): Promise<System> {

        const id = this.systemID;
        const eventType = "systemSystemTargetTargetsLoader";
        const hash = getHashArgs([]);

        return context.dataLoadersMap.get(eventType)?.get(hash)?.load(id);

    }

}
