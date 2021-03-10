import "reflect-metadata";
import {
    ClassType, ObjectType, Field,
} from "type-graphql";
import { AbstractEdge } from "../interface/abstract";

export function genericEdge<T>(TItem: ClassType<T>): ClassType<AbstractEdge<T>> {

    @ObjectType(`I${TItem.name}Edge`, {
        isAbstract: true,
    })
    class Edge extends AbstractEdge<T> {

        @Field(() => String, {
            nullable: true,
            description: "Значение курсора на соответствующий объект, указатель на объект",

        })
        public cursor: string;

        @Field(() => TItem, {
            nullable: true,
            description: "Некий объект, на который указывает курсор",

        })
        public node: T;

        constructor(
            cursor: string,
            node: T,
        ) {
            super();
            this.cursor = cursor;
            this.node = node;

        }

    }
    return Edge;

}
