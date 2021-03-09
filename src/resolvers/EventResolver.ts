import {
    Resolver, Query, Ctx, Arg, Mutation,
} from "type-graphql";
import {
    eventQuery, eventsQuery, createEventQuery,
    updateEventQuery,
    deleteEventQuery, deleteEventsQuery,
} from "../query/event";
import {Event, Target} from "../objects/types";
import { Context } from "../objects";

@Resolver()
export class EventResolver {

    @Mutation(() => Event, {
        nullable: false,
    })
    public async createEvent(
        @Ctx()
            context: Context,
        @Arg("name", {
            nullable: false,
        })
            name: string,
        @Arg("targetID", {
            nullable: false,
        })
            targetID: string,
        @Arg("viewerID", {
            nullable: false,
        })
            viewerID: string,
        @Arg("time", {
            nullable: true,
        })
            time: Date,
    ): Promise<Event> {

        return createEventQuery(context, name, targetID, viewerID, time);

    }

    @Query(() => Event, {
        nullable: true,
    })
    public async event(
        @Ctx()
            context: Context,

        @Arg("id", {
            nullable: false,
        })
            id: string,
    ): Promise<Event | null> {

        return eventQuery(context, id);

    }

    @Query(() => [Event], {
        nullable: false,
    })
    public async events(
        @Ctx()
            context: Context,
    ): Promise<Event[]> {

        return eventsQuery(context);

    }

    @Mutation(() => Event, {
        nullable: false,
    })
    public async updateEvent(
        @Ctx()
            context: Context,

        @Arg("id", {
            nullable: false,
        })
            id: string,

        @Arg("name", {
            nullable: false,
        })
            name: string,
        @Arg("targetID", {
            nullable: true,
        })
            targetID: string,
        @Arg("viewerID", {
            nullable: true,
        })
            viewerID: string,
        @Arg("time", {
            nullable: true,
        })
            time: Date
    ): Promise<Event | null> {

        return updateEventQuery(context, id, name, targetID, viewerID, time);

    }

    @Mutation(() => Event, {
        nullable: false,
    })
    public async deleteEvent(
        @Ctx()
            context: Context,

        @Arg("id", {
            nullable: false,
        })
            id: string,
    ): Promise<Event | null> {

        return deleteEventQuery(context, id);

    }

    @Mutation(() => [Event], {
        nullable: false,
    })
    public async deleteEvents(
        @Ctx()
            context: Context,
    ): Promise<Event[]> {

        return deleteEventsQuery(context);

    }

}
