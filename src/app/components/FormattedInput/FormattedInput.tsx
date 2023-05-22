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
   * Verifies user input, reformats value and adjusts cursor position.
   */
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value, selectionStart },
    } = event;

    if (value === "") {
      setInputValue(value);
      setCursorPos(0);
    } else {
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

      setInputValue(newInputValue);
      setCursorPos(newCursorPos);
    }
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
      onBlur={handleOnBlur}
      className={className}
    />
  );
}
