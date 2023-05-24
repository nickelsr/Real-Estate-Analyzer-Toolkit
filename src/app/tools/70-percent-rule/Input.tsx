import FormattedInput, {
  FormattedInputProps,
} from "@components/FormattedInput";

type InputProps = {
  name: string;
  prefix?: string;
  suffix?: string;
  required: boolean;
};

export default function Input({
  name,
  prefix,
  suffix,
  required = false,
}: InputProps) {
  return (
    <div className="text-field-wrapper">
      {prefix && <span className="text-field-prefix">{prefix}</span>}
      {suffix && <span className="text-field-suffix">{suffix}</span>}
      <FormattedInput
        className="text-field"
        id={name}
        name={name}
        required={required}
      />
    </div>
  );
}
