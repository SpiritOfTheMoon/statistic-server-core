import "reflect-metadata";
import {
    ClassType, Field, ObjectType, Int,
} from "type-graphql";
import { genericEdge, Edgable } from "./Edge";
import { ConnectionArgs } from "../args/ConnectionArgs";
import { PageInfo } from "../types";
import { HasNextPage } from "../../functions/HasNextPage";
import { HasPreviousPage } from "../../functions/HasPreviousPage";

export interface Connectionable<T> {
    edges: Edgable<T>[];
    totalCount: number;
}
export interface ConnectionableConstructor<T, U extends ConnectionArgs> {
    new(
        edges: Edgable<T>[],
        totalCount: number,
        args: U,
    ): Connectionable<T>;
}

export function genericConnection<T, U extends ConnectionArgs>(TItem: ClassType<T>): ConnectionableConstructor<T, U> {

    const Edge = genericEdge<T>(TItem);
    type Edge = InstanceType<typeof Edge>;

    @ObjectType(`${TItem.name}Connection`)
    class Connection implements Connectionable<T> {

        @Field(() => [Edge], {
            nullable: false,
            description: "Список элементов",
        })
        public edges: Edgable<T>[];

        @Field(() => Int, {
            nullable: false,
            description: "количество элементов",
        })
        public totalCount: number;

        @Field(() => PageInfo, {
            description: "Данные о странице",
            nullable: false,
        })
        public pageInfo: PageInfo;

        constructor(
            edges: Edgable<T>[],
            totalCount: number,
            args: U,
        ) {

            this.edges = edges;
            this.totalCount = totalCount;
            const pageInfo = this.getPageInfo(args);
            this.pageInfo = pageInfo;

        }

        private getPageInfo(
            args: U,
        ): PageInfo {

            let startCursor: string | null;
            let endCursor: string | null;
            if (this.edges.length === 0) {

                startCursor = null;
                endCursor = null;

            } else {

                startCursor = this.edges[0].cursor;
                endCursor = this.edges[this.edges.length - 1].cursor;

            }
            return {
                startCursor,
                hasNextPage: HasNextPage(this.totalCount, args),
                hasPreviousPage: HasPreviousPage(this.totalCount, args),
                endCursor,
            };

        }

    }
    return Connection;

}
