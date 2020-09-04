import "reflect-metadata";
import { ArgsType, Field } from "type-graphql";
import { ConnectionArgs } from "./ConnectionArgs";
import { OrderType } from "../enum/OrderType";

@ArgsType()
export class ConnectionArgsOrder extends ConnectionArgs {

    @Field(() => OrderType, {
        nullable: true,
        defaultValue: null,
        description: "тип сортировки ASC | DESC",
    })
    public order: OrderType | null = null;

    
    public orderField: string | null = null;

}
