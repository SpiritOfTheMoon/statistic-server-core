import { ViewerAttributesType } from "@umk-stat/statistic-server-database";
import { Field, ObjectType } from "type-graphql";
import { Node } from "../interface";

@ObjectType({
    implements: Node,
    simpleResolvers: true,
})
export class Viewer implements Node {

    public static builderFromDb(object: ViewerAttributesType): Viewer {

        const viewer = new Viewer();
        viewer.id = object.id;
        viewer.identifier = object.identifier;
        return viewer;

    }

    public id: string

    @Field(() => String, {
        nullable: false,
    })
    public identifier: string

}
