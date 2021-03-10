import { Context } from "../../objects/types/Context";
/*import { systemQuery } from "../system/systemQuery";
import { backendLogQuery } from "../backendLog/backendLogQuery";*/
import { Node } from "../../objects/interface";

export async function nodeQuery(
    context: Context,
    id: string,
): Promise<Node | null> {

    /*   const num = id.substring(0, 3);
       const nameClass = context.graphQLObjectMap.get(num);
       if (typeof nameClass !== "undefined") {
   
           switch (nameClass) {
   
           case "System":
               return systemQuery(context, id);
           case "BackendLog":
               return backendLogQuery(context, id);
   
           }
   
       }*/
    throw new Error("Неправильный id");



}
