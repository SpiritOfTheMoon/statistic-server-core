import { Context } from "../../objects/Context";
import { systemQuery } from "../system/systemQuery";
import { backendLogQuery } from "../backendLog/backendLogQuery";
import { targetQuery } from "../target/targetQuery";
import { Node } from "../../objects/interface";

export async function nodeQuery(
    context: Context,
    id: string,
): Promise<Node | null> {

    const num = id.substring(0, 4);
    const nameClass = context.graphQLObjectMap.get(num);
    if (typeof nameClass !== "undefined") {

        switch (nameClass) {

        case "System":
            return systemQuery(context, id);
        case "BackendLog":
            return backendLogQuery(context, id);
        case "Target":
            return targetQuery(context, id);

        }

    }
    throw new Error("Неправильный id");



}
