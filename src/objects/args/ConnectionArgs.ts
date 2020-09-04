import "reflect-metadata";
import {
    ArgsType, Field, Int,
} from "type-graphql";

@ArgsType()
export class ConnectionArgs {

    @Field(() => String, {
        nullable: true,
        defaultValue: null,
    })
    public after: string | null = null;

    @Field(() => String, {
        nullable: true,
        defaultValue: null,
    })
    public before: string | null = null;

    @Field(() => Int, {
        nullable: true,
        defaultValue: null,
    })
    public first: number | null = null;

    @Field(() => Int, {
        nullable: true,
        defaultValue: null,
    })
    public last: number | null = null;

    @Field(() => Int, {
        nullable: true,
        defaultValue: null,
    })
    public skip: number | null = null;

}
