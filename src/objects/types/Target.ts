import { TargetAttributesType } from "@umk-stat/statistic-server-database";
import { Field, ObjectType } from "type-graphql";
import { Node } from "../interface";

@ObjectType({
    implements: Node,
    simpleResolvers: true,
})
export class Target implements Node {

    public static builderFromDb(object: TargetAttributesType): Target {

        const target = new Target();
        target.id = object.id;
        target.name = object.name;
        return target;

    }

    public id: string

    @Field(() => String, {
        nullable: false,
    })
    public name: string

}
