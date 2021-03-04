import { Context } from "../../objects";
import { Event } from "../../objects/types";

export async function deleteEventsQuery(
    context: Context
): Promise<Event[]> {

    const eventsDb = await context.databaseApi.queries.deleteEvents();
    return eventsDb.map((eventDb) => Event.builderFromDb(eventDb.get()));
}
