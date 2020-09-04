import { Field, Int, Float, InterfaceType } from "type-graphql";


@InterfaceType({
    
})
export abstract class Statistic {

    @Field(() => Int, {
        nullable: false,
        simple: true,
    })
    count: number;


    @Field(() => Float, {
        nullable: false,
        simple: true,
    })
    average: number;

}
