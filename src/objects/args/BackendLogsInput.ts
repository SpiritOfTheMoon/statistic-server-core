import {
    ArgsType, Field, Float, InputType, 
} from "type-graphql";

@InputType()
export class BackendLogsInput {

    @Field(() => String, {
        nullable: false,
    })
    systemId: string;

    @Field(() => String, {
        nullable: false,
    })
    query: string;

    @Field(() => String, {
        nullable: false,
    })
    resultType: string;

    @Field(() => Date, {
        nullable: false,
    })
    date: Date;

    @Field(() => Float, {
        nullable: false,
    })
    perfomance: number;

    @Field(() => String, {
        nullable: false,
    })
    login: string;

    @Field(() => String, {
        nullable: true,
    })
    args?: string;

}
