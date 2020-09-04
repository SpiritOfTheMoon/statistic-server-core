import { Field, ObjectType, ID, Ctx, Arg, Args, UseMiddleware } from "type-graphql";
import { SystemAttributesType } from "@umk/statistic-server-database";
import { QueryInterval, QueryReportType, ResultType, ResultTypeInterval, BackendLog } from ".";
import { Context } from "../Context";
import { Connectionable } from "../genericObjects/Connection";
import { ConnectionArgsOrder } from "../args/ConnectionArgsOrder";
import { tableLogsDataLoaderInit } from "../../middleware/tableLogsDataLoaderInit";
import { countTableLogsDataLoaderInit } from "../../middleware/countTableLogsDataLoaderInit";
import { PeriodArgs } from "../args";
import { resultTypeReportLoaderInit } from "../../middleware/resultTypeReportLoaderInit";
import { resultTypeIntervalLoaderInit } from "../../middleware/resultTypeIntervalLoaderInit";
import { Datepart } from "../enum/Datepart";
import { queryLoaderInit } from "../../middleware/queryLoaderInit";
import { queryIntervalLoaderInit } from "../../middleware/queryIntervalLoaderInit";
import { Node } from "../interface";
import { BackendLogConnection } from "../connection/BackendLogConnection";


@ObjectType({
    simpleResolvers: true,
    implements: Node,
})
export class System implements Node {

    public static builderFromDb(object: SystemAttributesType): System {

        const system = new System();
        system.id = object.id;
        system.name = object.name;
        system.description = object.description;
        return system;

    }

    public id: string;

    @Field(() => String, {
        nullable: false,
    })
    public name: string;

    @Field(() => String, {
        nullable: false,
    })
    public description?: string | null;

    @UseMiddleware(tableLogsDataLoaderInit)
    @UseMiddleware(countTableLogsDataLoaderInit)
    @Field(() => BackendLogConnection, {
        nullable: false,
    })
    public async tableLogs(

        @Ctx()
        context: Context,

        @Args(() => ConnectionArgsOrder)
        args: ConnectionArgsOrder,

        @Arg("orderField", {
            nullable: false,
        })
        orderField: string,

    ): Promise<Connectionable<BackendLog>> {

        args.orderField = orderField;
        const { id } = this;
        const edges = await context.tableLogsDataLoader.load(id);
        const totalCount = await context.countTableLogsDataLoader.load(id);
        const connection = new BackendLogConnection(edges, totalCount, args);
        return connection;

    }

    @UseMiddleware(resultTypeReportLoaderInit)
    @Field(() => [ResultType], {
        nullable: false,
    })
    public async resultTypeReport(

        @Ctx()
        context: Context,

        @Args(() => PeriodArgs)
        args: PeriodArgs,

    ): Promise<ResultType[]> {

        const { id } = this;
        const result = await context.resultTypeReportLoader.load(id);
        return result;

    }

    @UseMiddleware(resultTypeIntervalLoaderInit)
    @Field(() => [ResultTypeInterval], {
        nullable: false,
    })
    public async resultTypeIntervalReport(

        @Ctx()
        context: Context,

        @Args(() => PeriodArgs)
        _args: PeriodArgs,

        @Arg("interval", () => Datepart, {
            nullable: false,
        })
        _interval: Datepart,

    ): Promise<ResultTypeInterval[]> {

        const { id } = this;
        const result = await context.resultTypeIntervalLoader.load(id);
        return result;

    }

    @UseMiddleware(queryLoaderInit)
    @Field(() => [QueryReportType], {
        nullable: false,
    })
    public async queriesReport(

        @Ctx()
        context: Context,

        @Args(() => PeriodArgs)
        _args: PeriodArgs,

    ): Promise<QueryReportType[]> {

        const { id } = this;
        const result = await context.queryLoader.load(id);
        return result;

    }


    @UseMiddleware(queryIntervalLoaderInit)
    @Field(() => [QueryInterval], {
        nullable: false,
    })
    public async queryIntervalReport(

        @Ctx()
        context: Context,

        @Args(() => PeriodArgs)
        _args: PeriodArgs,

        @Arg("interval", () => Datepart, {
            nullable: false,
        })
        _interval: Datepart,

    ): Promise<QueryInterval[]> {

        const { id } = this;
        const result = await context.queryIntervalLoader.load(id);
        return result;

    }


}

