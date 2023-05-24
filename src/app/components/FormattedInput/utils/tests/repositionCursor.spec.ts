import { expect } from "chai";
import { repositionCursor, RepositionCursorOptions } from "../repositionCursor";

describe("repositionCursor()", function () {
  it("should reposition the cursor between the digits surrounding the digit just removed with 'Delete'", function () {
    const options: RepositionCursorOptions = {
      inputValue: "12,345",
      eventValue: "12345",
      cursorPos: 2,
      key: "Delete",
    };

    const expectedNewInputString = "1,245";
    const expectedNewCursorPos = 3;
    expect(repositionCursor(options)).to.deep.equal([
      expectedNewInputString,
      expectedNewCursorPos,
    ]);
  });

  it("should reposition the cursor between the digits surrounding the digit just removed with 'Delete'", function () {
    const options: RepositionCursorOptions = {
      inputValue: "1,234",
      eventValue: "1234",
      cursorPos: 1,
      key: "Delete",
    };

    const expectedNewInputString = "134";
    const expectedNewCursorPos = 1;
    expect(repositionCursor(options)).to.deep.equal([
      expectedNewInputString,
      expectedNewCursorPos,
    ]);
  });

  it("should reposition the cursor between the digits surrounding the digit just removed with 'Backspace'", function () {
    const options: RepositionCursorOptions = {
      inputValue: "12,345",
      eventValue: "12345",
      cursorPos: 2,
      key: "Backspace",
    };

    const expectedNewInputString = "1,345";
    const expectedNewCursorPos = 1;
    expect(repositionCursor(options)).to.deep.equal([
      expectedNewInputString,
      expectedNewCursorPos,
    ]);
  });

  it("should reposition the cursor between the digits surrounding the digit just removed with 'Backspace'", function () {
    const options: RepositionCursorOptions = {
      inputValue: "1,234",
      eventValue: "1234",
      cursorPos: 1,
      key: "Backspace",
    };

    const expectedNewInputString = "234";
    const expectedNewCursorPos = 0;
    expect(repositionCursor(options)).to.deep.equal([
      expectedNewInputString,
      expectedNewCursorPos,
    ]);
  });

  it("should reposition the cursor between the digits surrounding the digit just removed with 'Backspace'", function () {
    const options: RepositionCursorOptions = {
      inputValue: "123,456,789",
      eventValue: "123,46,789",
      cursorPos: 5,
      key: "Backspace",
    };

    const expectedNewInputString = "12,346,789";
    const expectedNewCursorPos = 5;
    expect(repositionCursor(options)).to.deep.equal([
      expectedNewInputString,
      expectedNewCursorPos,
    ]);
  });

  it("should reposition the cursor between the digits surrounding the digit just removed with 'Backspace'", function () {
    const options: RepositionCursorOptions = {
      inputValue: "123,456,789",
      eventValue: "123,456789",
      cursorPos: 7,
      key: "Backspace",
    };

    const expectedNewInputString = "12,345,789";
    const expectedNewCursorPos = 6;
    expect(repositionCursor(options)).to.deep.equal([
      expectedNewInputString,
      expectedNewCursorPos,
    ]);
  });
});
