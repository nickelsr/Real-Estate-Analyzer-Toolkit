import { useState, useRef, useEffect } from "react";
import {
  isInt,
  removeLeadingZeros,
  removeSeparators,
  repositionCursor,
  RepositionCursorOptions,
} from "./utils";
import { FormattedInputProps } from "./FormattedInputProps";

export default function FormattedInput({
  id,
  name,
  className,
  required = false,
}: FormattedInputProps) {
  if (!name.length) {
    throw new Error("name must be a non empty string.");
  }

  const [inputValue, setInputValue] = useState<string>("");
  const [lastKeyPressed, setLastKeyPressed] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // handle caret positioning after input state updates
    if (inputRef.current && document.activeElement === inputRef.current) {
      inputRef.current.setSelectionRange(cursorPos, cursorPos);
    }
  }, [inputValue, cursorPos]);

  /**
   *
   */
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value, selectionStart },
    } = event;

    if (value === "") {
      setInputValue(value);
      setCursorPos(0);
    } else {
      // BUG: allows user to enter comma separators
      const numericValue = removeSeparators(value);
      if (!isInt(numericValue)) return;

      const repositionCursorProps: RepositionCursorOptions = {
        inputValue,
        eventValue: value,
        cursorPos: selectionStart,
        key: lastKeyPressed,
      };
      const [newInputValue, newCursorPos] = repositionCursor(
        repositionCursorProps
      );

      console.log(
        "onChange - value =",
        value,
        "| newInputValue =",
        newInputValue
      );

      setInputValue(newInputValue);
      setCursorPos(newCursorPos);
    }
  };

  /**
   * Sets the cursor position.
   */
  const handleOnFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    const {
      target: { selectionStart },
    } = event;

    const newCursorPos = selectionStart || inputValue.length;

    console.log("onFocus - newCursorPos =", newCursorPos);

    setCursorPos(newCursorPos);
  };

  /**
   * Formats input state.
   *
   * @remarks
   *
   * If there are leading zeros left by the user after editing,
   * upon Blur events, they will be stripped.
   */
  const handleOnBlur = () => {
    const formattedInputValue = removeLeadingZeros(inputValue);

    setInputValue(formattedInputValue);
  };

  /**
   * Sets key pressed state.
   */
  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;

    console.log("onKeyDown. key =", key);

    setLastKeyPressed(key);
  };

  return (
    <input
      ref={inputRef}
      id={id}
      name={name}
      value={inputValue}
      required={required}
      type="text"
      inputMode="numeric"
      onChange={handleOnChange}
      onKeyDown={handleOnKeyDown}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      className={className}
    />
  );
}
