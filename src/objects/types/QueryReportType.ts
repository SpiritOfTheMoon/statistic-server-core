import {
    Field, Int, ObjectType, Float, 
} from "type-graphql";
import { Statistic } from "../interface";

@ObjectType({
    implements: Statistic,
})
export class QueryReportType implements Statistic {

    @Field(() => String, {
        nullable: false,
        simple: true,
    })
    public query: string;

    public count: number;

    public average: number;

}
