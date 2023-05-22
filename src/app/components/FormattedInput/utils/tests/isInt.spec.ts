import { expect } from "chai";
import { isInt } from "../isInt";

describe("isInt()", function () {
  it(`Verifies that an empty string IS NOT an int`, function () {
    expect(isInt("")).to.equal(false);
  });

  it(`Verifies that a string containing only digits IS an int`, function () {
    expect(isInt("180192385810123456789")).to.equal(true);
  });

  it(`Verifies that a string containing a non-digit character IS NOT an int`, function () {
    expect(isInt("11,111")).to.equal(false);
  });
});
