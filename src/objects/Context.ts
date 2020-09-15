import { API } from "@umk-stat/statistic-server-database";
import { Logger } from "winston";
import Dataloader from "dataloader";
import { BackendLog } from "./types";
import { Edgable } from "./genericObjects/Edge";
import { ResultType } from "./types";
import { ResultTypeInterval } from "./types";
import { QueryReportType } from "./types";
import { QueryInterval } from "./types";

export class Context {

    readonly databaseApi: API;

    readonly infoLogger: Logger;

    readonly errorLogger: Logger;

    public queryIntervalLoader: Dataloader<string, QueryInterval[]>;

    public tableLogsDataLoader: Dataloader<string, Edgable<BackendLog>[]>;

    public countTableLogsDataLoader: Dataloader<string, number>;

    public resultTypeReportLoader: Dataloader<string, ResultType[]>;

    public resultTypeIntervalLoader: Dataloader<string, ResultTypeInterval[]>;

    public queryLoader: Dataloader<string, QueryReportType[]>;

    public queryLogsLoader: Dataloader<string, Edgable<BackendLog>[]>;

    public countQueryLogsLoader: Dataloader<string, number>;

    public readonly graphQLObjectMap: Map<string, string>;

    constructor(
        databaseAPi: API,
        infoLogger: Logger,
        errorLogger: Logger,
        graphQLObjectMap: Map<string, string>,
    ) {

        this.databaseApi = databaseAPi;
        this.infoLogger = infoLogger;
        this.errorLogger = errorLogger;
        this.graphQLObjectMap = graphQLObjectMap;

    }
}
