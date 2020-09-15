import { Field, Float, ObjectType, ID, Ctx, Args, Arg } from "type-graphql";
import { BackendLogsAttributesType } from "@umk-stat/statistic-server-database";
import { Node } from "../interface/Node";
import { QueryReportType, StatisticType } from ".";
import { Context } from "../Context";
import { PeriodArgs } from "../args";
import { Datepart } from "../enum";
import { validateConnectionArgsOrder } from "../../functions/validateConnectionArgsOrder";
import { ConnectionArgsOrder } from "../args/ConnectionArgsOrder";
import { Connectionable } from "../genericObjects/Connection";
import { decodeToBase64 } from "../../decode/decodeToBase64";
import { Edgable } from "../genericObjects/Edge";
import { BackendLogConnection } from "../connection/BackendLogConnection";


@ObjectType({
    simpleResolvers: true,
    implements: Node,
})
export class BackendLog implements Node {

    public static builderFromDb(object: BackendLogsAttributesType): BackendLog {

        const umkBackendQuery = new BackendLog();
        umkBackendQuery.id = object.id;
        umkBackendQuery.date = object.date;
        umkBackendQuery.login = object.login;
        umkBackendQuery.perfomance = object.perfomance;
        umkBackendQuery.args = object.args;
        umkBackendQuery.query = object.query;
        umkBackendQuery.resultType = object.resultType;
        umkBackendQuery.result = object.result;
        umkBackendQuery.systemId = object.systemId;
        return umkBackendQuery;

    }

    id: string

    @Field(() => String, {
        nullable: false,
    })
    query: string;

    @Field(() => String, {
        nullable: false,
    })
    result: string;

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

    systemId: string;

    @Field(() => String, {
        nullable: true,
    })
    args?: string | null;


    // @Field(() => BackendLogConnection, {
    //     nullable: false,
    // })
    // public async queryLogs(

    //     @Ctx()
    //     context: Context,

    //     @Args(() => ConnectionArgsOrder)
    //     args: ConnectionArgsOrder,

    //     @Arg("orderField", {
    //         nullable: false,
    //     })
    //     orderField: string,

    // ): Promise<Connectionable<BackendLog>> {

    //     args.orderField = orderField;
    //     const { id } = this;
    //     const { limit, offset, order, orderRowNumber } = validateConnectionArgsOrder(args as ConnectionArgsOrder);
    //     const edges = (await context.databaseApi.queries.findAllLogsByQuery(id, limit, offset, orderField, orderRowNumber, order)).map<Edgable<BackendLog>>((val) => ({
    //         cursor: decodeToBase64(val.rowNumber.toString()),
    //         node: BackendLog.builderFromDb(val),
    //     }));
    //     const totalCount = (await context.databaseApi.queries.findCountAverageLogsByQuery(id)).count;
    //     const connection = new BackendLogConnection(edges, totalCount, args);

    //     return connection;
    // }

    @Field(() => QueryReportType, {
        nullable: false,
    })
    public async queryStatistic(

        @Ctx()
        context: Context,


    ): Promise<QueryReportType> {

        const { id, query } = this;
        const { average, count } = await context.databaseApi.queries.findCountAverageLogsByQuery(id);
        return {
            query,
            average: average ?? 0,
            count,
        };

    }

    @Field(() => [StatisticType], {
        nullable: false,
    })
    public async queryIntervalStatistic(

        @Ctx()
        context: Context,

        @Args(() => PeriodArgs)
        args: PeriodArgs,

        @Arg("interval", () => Datepart, {
            nullable: false,
        })
        interval: Datepart,

    ): Promise<StatisticType[]> {

        const { begin, end } = args;
        const { id, query } = this;
        const result = await context.databaseApi.queries.findStatisticByQueryByInterval(id, begin, end ?? new Date(), interval);
        const statistics = result.map<StatisticType>(({ average, count, fromDate, toDate }) => ({
            average: average ?? 0,
            count,
            fromDate,
            toDate,
        }));
        return statistics;

    }
}

