import Input from "./Input";
import Label from "./Label";

export default function InputField({
  name,
  display,
  tooltip,
  isCurrency,
  isMeasurement,
  required,
}) {
  return (
    <>
      <Label
        name={name}
        display={display}
        tooltip={tooltip}
        required={required}
      />
      <Input
        name={name}
        isCurrency={isCurrency}
        isMeasurement={isMeasurement}
        required={required}
      />
    </>
  );
}
