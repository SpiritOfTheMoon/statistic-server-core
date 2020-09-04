import "reflect-metadata";
import { Period } from "../../../src/objects/enum/Period";

test("Period", () => {

    expect(Period.CustomDate).toEqual("CUSTOM_DATE");
    expect(Period.Year).toEqual("YEAR");
    expect(Period.Month).toEqual("MONTH");
    expect(Period.Day).toEqual("DAY");

});
