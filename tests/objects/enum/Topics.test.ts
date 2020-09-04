import "reflect-metadata";
import {Topics} from "../../../src/objects/enum/Topics";

test ("Topics", () => {

    expect(Topics.BackendLogs).toEqual("BACKEND_LOGS");

});
