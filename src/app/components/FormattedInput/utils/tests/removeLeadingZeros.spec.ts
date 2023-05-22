import { expect } from "chai";
import { removeLeadingZeros } from "../removeLeadingZeros";

describe("removeLeadingZeros()", function () {
  it("Does not remove zeros following any non-zero character.", function () {
    const noLeadingZeros = "100,000,000";
    expect(removeLeadingZeros(noLeadingZeros)).to.equal(noLeadingZeros);
  });

  it("Removes all leading zeros", function () {
    const noLeadingZeros = "100,000,000";
    expect(removeLeadingZeros("000" + noLeadingZeros)).to.equal(noLeadingZeros);
  });
});
