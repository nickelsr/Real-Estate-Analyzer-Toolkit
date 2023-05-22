import { expect } from "chai";
import { removeSeparators } from "../removeSeparators";

describe("removeSeparators()", function () {
  const tests = [
    { input: "", expected: "" },
    { input: "1", expected: "1" },
    { input: "11", expected: "11" },
    { input: "111", expected: "111" },
    { input: "1,111", expected: "1111" },
    { input: "11,111", expected: "11111" },
    { input: "111,111", expected: "111111" },
    { input: "1,111,111", expected: "1111111" },
    { input: "11,111,111", expected: "11111111" },
    { input: "111,111,111", expected: "111111111" },
  ];

  tests.forEach(({ input, expected }) => {
    it(`Correctly removes separators from string input of length ${input.length}`, function () {
      expect(removeSeparators(input)).to.equal(expected);
    });
  });
});
