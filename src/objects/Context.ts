import { API } from "@umk-stat/statistic-server-database";
import { Logger } from "winston";
import DataLoader from "dataloader";

export class Context {

    readonly databaseApi: API;

    readonly infoLogger: Logger;

    readonly errorLogger: Logger;

    public dataLoadersMap: Map<string, Map<string, DataLoader<any, any, any>>> = new Map<string, Map<string, DataLoader<any, any, any>>>();

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
