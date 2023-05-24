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

import { removeSeparators } from "./removeSeparators";
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
  let unformattedNewInputValue = eventValue;
  // used to reposition the cursor after formatting new input value
  let leftOfChange = removeSeparators(eventValue.slice(0, newCursorPos));

  let unseparatedInputValue = removeSeparators(inputValue);
  let unseparatedEventValue = removeSeparators(eventValue);

  if (key && unseparatedEventValue === unseparatedInputValue) {
    // a removed comma separator is the only difference
    const splitInputValue = inputValue.split("");

    if (key === "Backspace" && inputValue[newCursorPos] === ",") {
      splitInputValue.splice(newCursorPos - 1, 1);
      unformattedNewInputValue = splitInputValue.join("");
      leftOfChange = removeSeparators(eventValue.slice(0, newCursorPos - 1));
    } else if (key === "Delete" && inputValue[newCursorPos] === ",") {
      splitInputValue.splice(newCursorPos + 1, 1);
      unformattedNewInputValue = splitInputValue.join("");
    }
  }

  const newInputValue = toFormattedString(unformattedNewInputValue);

  let i = 0;
  for (newCursorPos = 0; i < leftOfChange.length; newCursorPos++) {
    if (newInputValue[newCursorPos] !== ",") i++;
  }

  return [newInputValue, newCursorPos];
};
