import { Topics } from "../../src/objects/enum/Topics"
import { BackendLogsResolver } from "../../src/resolvers/BackendLogsResolver";

test("topics", async() => {
    const resolver: BackendLogsResolver = new BackendLogsResolver();
    const topics = await resolver.topics();
    Object.keys(Topics).map((key) => {

        expect(topics.includes(Topics[key])).toEqual(true);

    });
})