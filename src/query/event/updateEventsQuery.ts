import { Context } from "../../objects";
import { Event } from "../../objects/types";

export async function updateEventNameQuery(
    context: Context,
    id: string,
    name: string,
): Promise<null | Event> {

    const eventDb = await context.databaseApi.queries.updateEventName(id, name);
    return eventDb === null ? null : Event.builderFromDb(eventDb.get());

}

export async function updateEventTargetIDQuery(
    context: Context,
    id: string,
    targetID: string,
): Promise<null | Event> {

    const eventDb = await context.databaseApi.queries.updateEventTargetID(id, targetID);
    return eventDb === null ? null : Event.builderFromDb(eventDb.get());

}
