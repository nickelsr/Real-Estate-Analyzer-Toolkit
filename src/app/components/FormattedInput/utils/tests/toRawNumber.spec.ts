import { expect } from "chai";
import { toRawNumber } from "../toRawNumber";

describe("FormattedInput - toRawNumber()", function () {
  it("returns a valid integer number.", function () {
    expect(toRawNumber("0001,022,599")).to.equal(1022599);
  });

  it("returns 0 when passed an empty string.", function () {
    expect(toRawNumber("")).to.equal(0);
  });
});
