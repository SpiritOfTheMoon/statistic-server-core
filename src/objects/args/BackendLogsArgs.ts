import { ArgsType, Field } from "type-graphql";
import { Period } from "../enum/Period";

@ArgsType()
export class  BackendLogsArgs {

    @Field(() => String, {
        nullable: false,
    })
    systemId: string;

    @Field(() => Period, {
        nullable: false,
    })
    period: Period;


    @Field(() => Date, {
        nullable: true,
    })
    date?: Date;

}
