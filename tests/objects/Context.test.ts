import { Context } from "../../src/objects/Context";
import { API } from "@umk-stat/statistic-database";
import { Logger } from "winston";

test ("Context", () => {

    let api: API;
    let infoLogger: Logger;
    let errorLogger: Logger;
    const context = new Context(api, infoLogger, errorLogger);
    expect(context).toHaveProperty("databaseApi");
    expect(context).toHaveProperty("infoLogger");
    expect(context).toHaveProperty("errorLogger");
})
