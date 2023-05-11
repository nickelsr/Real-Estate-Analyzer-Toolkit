import { useState } from "react";

export default function Input({ name, isCurrency, isMeasurement, required }) {
  const [inputValue, setInputValue] = useState("");

  const isValidInt = value => {
    return value === "" || (!isNaN(parseFloat(value)) && isFinite(value));
  };

  const handleOnChange = event => {
    const value = event.target.value.replaceAll(",", "");
    if (value === "") {
      return setInputValue("");
    }
    if (isValidInt(value)) {
      const leadingZeros = value.search(/[^0]/);
      const formattedValue =
        value.slice(0, leadingZeros) +
        (+value.slice(leadingZeros)).toLocaleString();
      setInputValue(formattedValue);
    }
  };

  return (
    <div className="text-field-wrapper">
      {isCurrency && <span className="text-field-prefix">$</span>}
      {isMeasurement && <span className="text-field-suffix">sq/ft</span>}
      <input
        className="text-field"
        id={name}
        name={name}
        type="text"
        inputMode="numeric"
        value={inputValue}
        onChange={handleOnChange}
        required={required}
      />
    </div>
  );
}
