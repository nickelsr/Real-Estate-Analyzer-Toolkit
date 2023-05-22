import { expect } from "chai";
import { toFormattedString } from "../toFormattedString";

describe("addSeparators()", function () {
  const tests = [
    { input: "", expected: "" },
    { input: "1", expected: "1" },
    { input: "11", expected: "11" },
    { input: "111", expected: "111" },
    { input: "1111", expected: "1,111" },
    { input: "11111", expected: "11,111" },
    { input: "111111", expected: "111,111" },
    { input: "1111111", expected: "1,111,111" },
    { input: "11111111", expected: "11,111,111" },
    { input: "111111111", expected: "111,111,111" },
    { input: "00111111111", expected: "00111,111,111" },
    { input: "00,1,11,111,111", expected: "00111,111,111" },
  ];

  tests.forEach(({ input, expected }) => {
    it(`Correctly separates string input of length ${input.length}`, function () {
      expect(toFormattedString(input)).to.equal(expected);
    });
  });
});
