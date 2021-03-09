import { Context } from "../../objects";
import { Event } from "../../objects";

export async function deleteEventQuery(
    context: Context,
    id: string,
): Promise<null | Event> {

    const eventDb = await context.databaseApi.queries.deleteEvent(id);
    return eventDb === null ? null : Event.builderFromDb(eventDb.get());

}
