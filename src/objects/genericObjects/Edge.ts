import "reflect-metadata";
import {
    ClassType, ObjectType, Field,
} from "type-graphql";

export interface Edgable<T> {
    cursor: string;
    node: T;
}

export interface EdgableConstructor<T = any> {
    new(
        cursor: string,
        node: T,
    ): Edgable<T>;
}
export function genericEdge<T>(TItem: ClassType<T>): EdgableConstructor<T> {

    @ObjectType(`${TItem.name}Edge`)
    class Edge implements Edgable<T> {

        @Field(() => String, {
            nullable: false,
            description: "Значение курсора на соответствующий объект, указатель на объект",

        })
        public cursor: string;

        @Field(() => TItem, {
            nullable: false,
            description: "Некий объект, на который указывает курсор",

        })
        public node: T;

        constructor(
            cursor: string,
            node: T,
        ) {

            this.cursor = cursor;
            this.node = node;

        }

    }
    return Edge;

}
