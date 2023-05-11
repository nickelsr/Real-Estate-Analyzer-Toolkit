import Output from "./Output";
import Label from "./Label";

export default function OutputField({ value, name, display, required }) {
  return (
    <>
      <Label
        name={name}
        display={display}
        required={required}
      />
      <Output value={value} />
    </>
  );
}
