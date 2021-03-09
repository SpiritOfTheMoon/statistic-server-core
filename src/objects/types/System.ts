import {
    Field, ObjectType, ID, Ctx, Arg, Args, UseMiddleware,
} from "type-graphql";
import { SystemAttributes } from "@umk-stat/statistic-server-database";
import {
    QueryInterval, QueryReportType, ResultType, ResultTypeInterval, BackendLog,
} from "./index";
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
import { getHashArgs } from "../../functions/getHashArgs";


@ObjectType({
    simpleResolvers: true,
    implements: Node,
})
export class System implements Node {

    public static builderFromDb(object: SystemAttributes): System {

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
        const edgeType = "tableLogsDataLoader";
        const countType = "countTableLogsDataLoader";
        const hash = getHashArgs(args);
        const edges = await context.dataLoadersMap.get(edgeType)?.get(hash)?.load(id);
        const totalCount = await context.dataLoadersMap.get(countType)?.get(hash)?.load(id);

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
        const countType = "resultTypeReportLoader";
        const hash = getHashArgs(args);
        const result = await context.dataLoadersMap.get(countType)?.get(hash)?.load(id);
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
        const countType = "resultTypeIntervalLoader";
        const args = { ..._args, interval: _interval };
        const hash = getHashArgs(args);
        const result = await context.dataLoadersMap.get(countType)?.get(hash)?.load(id);
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
        const countType = "queryLoader";
        const args = { ..._args };
        const hash = getHashArgs(args);
        const result = await context.dataLoadersMap.get(countType)?.get(hash)?.load(id);
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
        const countType = "queryIntervalLoader";
        const args = { ..._args, interval: _interval };
        const hash = getHashArgs(args);
        const result = await context.dataLoadersMap.get(countType)?.get(hash)?.load(id);
        return result;

    }


}

