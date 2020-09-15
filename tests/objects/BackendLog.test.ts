import "reflect-metadata";
import { BackendLog } from "../../src/objects//types";
import { BackendLogsAttributesType } from "@umk-stat/statistic-database/dist/models";

test ("builder UmkBackendQuery", () => {

    const date = new Date();
    const object: BackendLogsAttributesType = {
        date,
        id: "1",
        login: "65msn",
        perfomance: 123.123213,
        query: "42",
        args: undefined,
        result: "data",
        resultType: "Error"
    }
    const newObject = BackendLog.builderFromDb(object);

    expect(newObject.id).toEqual("1");
    expect(newObject.login).toEqual("65msn");
    expect(newObject.perfomance).toEqual(123.123213);
    expect(newObject.query).toEqual("42");
    expect(newObject.date).toEqual(date);
    expect(newObject.args).toBeUndefined();
    expect(newObject.result).toEqual("data");
    expect(newObject.resultType).toEqual("Error");

});