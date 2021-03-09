import { ViewerAttributes } from "@umk-stat/statistic-server-database";
import { Field, ObjectType } from "type-graphql";
import { Node } from "../interface";
import {strict} from "assert";

@ObjectType({
    implements: Node,
    simpleResolvers: true,
})
export class Viewer implements Node {

    public static builderFromDb(object: ViewerAttributes): Viewer {

        const viewer = new Viewer();
        viewer.id = object.id;
        viewer.identifier = object.identifier;
        viewer.userInfo = object.userInfo;
        viewer.compInfo = object?.compInfo;
        return viewer;

    }

    public id: string

    @Field(() => String, {
        nullable: false,
    })
    public identifier: string

    @Field(() => String, {
        nullable: false,
    })
    public userInfo: string

    @Field(() => String, {
        nullable: true,
    })
    public compInfo: string

}
