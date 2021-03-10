import "reflect-metadata";
import {
    ClassType, Field, ObjectType, Int,
} from "type-graphql";
import { ConnectionArgs } from "../args";
import { AbstractConnection, AbstractEdge } from "../interface";
import { PageInfo } from "../types";
import { genericEdge } from "./Edge";



export function genericConnection<T>(TItem: ClassType<T>): ClassType<AbstractConnection<T>> {

    const Edge = genericEdge<T>(TItem);
    type Edge = InstanceType<typeof Edge>;

    @ObjectType(`I${TItem}Connection`, {
        isAbstract: true,
    })
    class Connection extends AbstractConnection<T> {

        @Field(() => [Edge], {
            nullable: true,
            description: "Список элементов",
        })
        public edges: Edge[];

        @Field(() => Int, {
            nullable: true,
            description: "количество элементов",
        })
        public totalCount: number;

        @Field(() => PageInfo, {
            description: "Данные о странице",
            nullable: true,
        })
        public pageInfo: PageInfo;

        constructor(
            edges: AbstractEdge<T>[],
            totalCount: number,
            args: ConnectionArgs,
        ) {
            super(edges, totalCount, args);
        }

    }
    return Connection;

}
