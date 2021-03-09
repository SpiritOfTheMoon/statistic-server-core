import { Context } from "../../objects";
import { Event } from "../../objects/types";

export async function updateEventQuery(
    context: Context,
    id: string,
    name?: string,
    viewerID?: string,
    targetID?: string,
    time?: Date,
): Promise<null | Event> {

    const eventDb = await context.databaseApi.queries.updateEvent(id, name, viewerID, targetID, time);
    return eventDb === null ? null : Event.builderFromDb(eventDb.get());

}

