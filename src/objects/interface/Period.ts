import {
    Field, Int, Float, InterfaceType, 
} from "type-graphql";


@InterfaceType({
    
})
export abstract class Period {

    @Field(() => Date, {
        nullable: false,
        simple: true,
    })
    fromDate: Date;


    @Field(() => Date, {
        nullable: false,
        simple: true,
    })
    toDate: Date;

}
