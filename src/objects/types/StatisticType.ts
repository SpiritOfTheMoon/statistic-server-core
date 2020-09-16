import {
    ObjectType, Field, Int,
} from "type-graphql";
import { Period } from "../interface/Period";
import { Statistic } from "../interface";

@ObjectType({
    implements: [Period, Statistic],
})
export class StatisticType implements Period, Statistic {


    public fromDate: Date;

    public toDate: Date;

    public average: number;

    public count: number;

    public deviation?: number;

    public maxValue?: number;

}
