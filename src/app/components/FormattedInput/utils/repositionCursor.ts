/**
 * Cursor positioning behavior with comma separated number formatting is
 * undefined. Consider when the cursor is positioned behind a comma separator
 * and the "Delete" key is pressed. Instead of deleting the separator itself,
 * the user probably means to delete the number in front of the separator.
 * A similar situation occurs when the cursor is positioned in front of a
 * separator and the "Backspace" key is pressed. This function handles those
 * cases, as well as incrementing or decrementing the cursor position when
 * a separator is added or removed (e.g., after a number is added to the input
 * and "100" becomes "1,000").
 */

import { toFormattedString } from "./toFormattedString";

export interface RepositionCursorOptions {
  /**
   * Input elements current value.
   */
  inputValue: string;

  /**
   * Input elements onChange event target value.
   */
  eventValue: string;

  /**
   * The position of the cursor inside of the input element.
   */
  cursorPos: number | null;

  /**
   * The last key stroke.
   */
  key?: string | null;
}

/**
 * Handles cursor positioning after a change to formatted input.
 *
 * @returns updated input value and cursor position
 */
export const repositionCursor = ({
  inputValue,
  eventValue,
  cursorPos,
  key,
}: RepositionCursorOptions): [string, number] => {
  let newCursorPos = cursorPos || 0;
  let newInputValue = eventValue;

  console.log("repositionCursor - eventValue =", eventValue);

  if (key && cursorPos) {
    const splitInputValue = inputValue.split("");

    if (key === "Backspace" && inputValue[cursorPos] === ",") {
      splitInputValue.splice(cursorPos - 1, 1);
      newInputValue = splitInputValue.join("");
      newCursorPos -= 1;
    } else if (key === "Delete" && inputValue[cursorPos] === ",") {
      splitInputValue.splice(cursorPos + 1, 1);
      newInputValue = splitInputValue.join("");
      newCursorPos += 1;
    }
  }

  const preFormatLength = newInputValue.length;
  newInputValue = toFormattedString(newInputValue);
  const postFormatLength = newInputValue.length;

  newCursorPos += postFormatLength - preFormatLength;
  newCursorPos = Math.max(0, newCursorPos);
  newCursorPos = Math.min(newInputValue.length, newCursorPos);

  return [newInputValue, newCursorPos];
};
