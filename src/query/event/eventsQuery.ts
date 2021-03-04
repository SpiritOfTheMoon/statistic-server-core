import { Context } from "../../objects";
import { Event } from "../../objects/types";

export async function eventsQuery(
    context: Context
): Promise<Event[]> {

    const eventsDb = await context.databaseApi.queries.findEvents();
    return eventsDb.map((eventDb) => Event.builderFromDb(eventDb.get()));

}
