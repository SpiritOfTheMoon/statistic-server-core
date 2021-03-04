import { Context } from "../../objects";
import { Event } from "../../objects/types";

export async function createEventQuery(
    context: Context,
    name: string,
    targetID: string,
): Promise<Event> {

    const eventDb = await context.databaseApi.queries.createEvent({
        name,
        targetID,
    });
    return Event.builderFromDb(eventDb.get());

}
