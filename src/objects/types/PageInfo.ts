import "reflect-metadata";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class PageInfo {

    @Field(() => Boolean, {
        nullable: false,
    }) public hasPreviousPage: boolean;

    @Field(() => Boolean, {
        nullable: false,
    })
    public hasNextPage: boolean;

    @Field(() => String, {
        nullable: true,
        defaultValue: null,
    })
    public startCursor: string | null = null;

    @Field(() => String, {
        nullable: true,
        defaultValue: null,
    })
    public endCursor: string | null = null;

}
