import { useState, useRef, useEffect } from "react";

const isValidInt = value => {
  return value === "" || (!isNaN(parseFloat(value)) && isFinite(value));
};

/**
 * Remove leading zeros and separators from input value
 * @param {(string|number)} value - A non-negative integer.
 * @returns {string} The cleaned value.
 *
 */
const cleanValue = value => {
  // remove leading zeros
  const firstPosIntIndex = value.search(/[^0]/);
  if (firstPosIntIndex === -1) return "";
  value = value.slice(firstPosIntIndex);

  // remove comma separators
  value = value.replaceAll(",", "");

  return value;
};

/**
 * Accepts a valid Int value and returns a formatted currency value
 *
 * @param {string} value
 * @returns {string} formatted currency value
 */
const toDisplayFormat = value => {
  if (!isValidInt) {
    throw new Error("value must be a valid Int.");
  }

  return Intl.NumberFormat("en-US").format(value);
};

export default function Input({
  name,
  isCurrency,
  isMeasurement,
  required = false,
}) {
  if (name === undefined || name === null || name === "") {
    throw new Error("name must be defined.");
  }

  const [inputValue, setInputValue] = useState("");
  const [lastKeyPress, setLastKeyPress] = useState(null);
  const [cursorPos, setCursorPos] = useState(0);
  const inputRef = useRef();

  useEffect(() => {
    // handle caret positioning after input state updates
    inputRef.current.setSelectionRange(cursorPos, cursorPos);
  }, [inputValue, cursorPos]);

  const handleOnChange = event => {
    const {
      target: { value, selectionStart },
    } = event;

    if (!isValidInt(value)) return;

    let firstPosIntIndex = value.search(/[^0]/);
    if (firstPosIntIndex === -1) {
      // event value is only zeros
    } else {
    }

    // const formattedValue = Intl.NumberFormat("en-US").format(value);
    return setInputValue(value);
  };

  const handleOnFocus = event => {
    const {
      target: { selectionStart },
    } = event;

    setCursorPos(selectionStart);
  };

  const handleOnBlur = event => {
    const {
      target: { value, selectionStart },
    } = event;

    const numValue = cleanValue(value);
    const displayValue = toDisplayFormat(numValue);

    let newCursorPos = cursorPos + (displayValue.length - numValue.length);
    newCursorPos = Math.max(newCursorPos, 0);

    setCursorPos(newCursorPos);
    setInputValue(displayValue);
  };

  const handleOnKeyDown = event => {
    const key = event.current.key;
    setLastKeyPress(key);
  };

  return (
    <div className="text-field-wrapper">
      {isCurrency && <span className="text-field-prefix">$</span>}
      {isMeasurement && <span className="text-field-suffix">sq/ft</span>}
      <input
        className="text-field"
        ref={inputRef}
        id={name}
        name={name}
        type="text"
        inputMode="numeric"
        value={inputValue}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        required={required}
      />
    </div>
  );
}
