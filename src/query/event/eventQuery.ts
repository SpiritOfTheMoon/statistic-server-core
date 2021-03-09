import { Context } from "../../objects";
import { Event } from "../../objects/types";

export async function eventQuery(
    context: Context,
    id: string,
): Promise<Event | null> {

    const eventDb = await context.databaseApi.queries.findEvent(id);
    return eventDb === null ? null : Event.builderFromDb(eventDb.get());

}
