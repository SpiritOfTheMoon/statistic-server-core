import { ArgsType, Field } from "type-graphql";
import { Period } from "../enum/Period";

@ArgsType()
export class  BackendLogSubscriptionArgs {

    @Field(() => String, {
        nullable: false,
    })
    systemId: string;

}
