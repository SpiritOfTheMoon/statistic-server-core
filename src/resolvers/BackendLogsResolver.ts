import "reflect-metadata";
import {
    Resolver, Query, Arg, Mutation, Subscription, Args, Ctx, PubSub, Publisher, Root, ResolverFilterData,
} from "type-graphql";
import { Topics } from "../objects/enum/Topics";
import { BackendLogsInput } from "../objects/args/BackendLogsInput";
import { BackendLog } from "../objects/types";
import { Context } from "../objects/Context";
import { BackendLogsArgs } from "../objects/args/BackendLogsArgs";
import { getDate } from "../functions/getDate";
import { BackendLogSubscriptionArgs } from "../objects/args/backendLogSubscriptionArgs";
import { backendLogQuery } from "../query/backendLog/backendLogQuery";

@Resolver()
export class BackendLogsResolver {

    @Query(() => [String], {

    })
    public async topics(): Promise<string[]> {

        return Object.keys(Topics).map((key) => Topics[key]);

    }

    @Query(() => BackendLog, {
        nullable: true,
    })
    public async backendLogQuery(

        @Arg("id", () => String, {
            nullable: false,
        })
            id: string,
        @Ctx()
            context: Context,
    ): Promise<BackendLog | null> {

        return backendLogQuery(context, id);

    }

    @Query(() => [BackendLog], {

    })
    public async backendLogsQuery(

        @Args(() => BackendLogsArgs)
            args: BackendLogsArgs,
        @Ctx()
            context: Context,
    ): Promise<BackendLog[]> {

        let { period, systemId, date } = args;
        if (typeof date === "undefined") {

            date = new Date();

        }
        const fromDate = getDate(period, date);

        const data = await context.databaseApi.queries.findBackendLogs(fromDate, systemId);
        return data.map((value) => {

            return BackendLog.builderFromDb(value.get());
        
        });

    }


    @Mutation(() => [BackendLog], {
        nullable: false,
    })
    public async backendLogsMutation(
        @Ctx()
            context: Context,
        @Arg("args", () => [BackendLogsInput], {
            nullable: false,
        })
            args: BackendLogsInput[],

        @PubSub(Topics.BackendLogs)
            publish: Publisher<BackendLog>,

    ): Promise<BackendLog[]> {

        try {

            const queryResults = await context.databaseApi.queries.createBackendLogs(args);
            const gettedQueries = queryResults.map((queryResult) => BackendLog.builderFromDb(queryResult.get()));
            gettedQueries.forEach(value => void publish(value));
            context.infoLogger.info(`${JSON.stringify(gettedQueries)}`)
            return gettedQueries;
        
        } catch (error) {

            throw error;
        
        }


    }

    @Subscription(() => BackendLog, {
        topics: Topics.BackendLogs,
        filter: ({ args, payload }: ResolverFilterData<BackendLog, BackendLogSubscriptionArgs, Context>) => {

            if (args.systemId === payload.systemId) {

                return true;
            
            }
            return false;

        },
    })
    public async backendLogSubscription(
        @Args(() => BackendLogSubscriptionArgs)
            __: BackendLogSubscriptionArgs,
        @Root()
            root: BackendLog,

    ): Promise<BackendLog> {

        return root;

    }



}
