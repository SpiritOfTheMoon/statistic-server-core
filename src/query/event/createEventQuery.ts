import { Context } from "../../objects";
import { Event } from "../../objects/types";

export async function createEventQuery(
    context: Context,
    name: string,
    targetID: string,
    viewerID: string,
    time?: Date
): Promise<Event> {

    const eventDb = await context.databaseApi.queries.createEvent({
        name,
        targetID,
        viewerID,
        time,
    });
    return Event.builderFromDb(eventDb.get());

}
