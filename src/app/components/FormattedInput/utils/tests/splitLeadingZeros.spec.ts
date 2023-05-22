import { expect } from "chai";
import { splitLeadingZeros } from "../splitLeadingZeros";

describe("splitLeadingZeros()", function () {
  it("splits an empty string into an array of two empty strings", function () {
    expect(splitLeadingZeros("")).to.deep.equal(["", ""]);
  });

  it("splits a string with ONLY leading zeros into one equal string, and one empty string", function () {
    const leadingZeros = "000";
    expect(splitLeadingZeros(leadingZeros)).to.deep.equal([leadingZeros, ""]);
  });

  it("splits a string with leading zeros into a string with only leading zeros, and a string without leading zeros", function () {
    const leadingZeros = "000";
    const withoutLeadingZeros = "1,000,100";
    expect(splitLeadingZeros(leadingZeros + withoutLeadingZeros)).to.deep.equal(
      [leadingZeros, withoutLeadingZeros]
    );
  });
});
