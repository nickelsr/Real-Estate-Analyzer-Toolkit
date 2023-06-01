import Popover from "@/app/components/UI/Popover/Popover";
import FormattedInput, {
  FormattedInputProps,
} from "@components/FormattedInput";
import styles from "./InputField.module.scss";

export type InputFieldProps = {
  name: string;
  label: string;
  description?: string;
  prefix?: string;
  suffix?: string;
  required?: boolean;
  optional?: boolean;
};

export default function InputField({
  name,
  label,
  description,
  prefix,
  suffix,
  optional,
  required = false,
}: InputFieldProps) {
  const formattedInputProps: FormattedInputProps = {
    className: "text-field",
    id: name,
    name,
    required,
  };

  const labelClasses = `${styles.label} ${optional ? styles.optional : ""}`;

  return (
    <div className={styles.container}>
      <div className={styles.label_container}>
        <label
          htmlFor={name}
          className={labelClasses}
        >
          {label}
        </label>
        {description && (
          <div className={styles.popover_wrapper}>
            <Popover info={description} />
          </div>
        )}
      </div>
      <div className="text-field-wrapper">
        {prefix && <span className="text-field-prefix">{prefix}</span>}
        {suffix && <span className="text-field-suffix">{suffix}</span>}
        <FormattedInput {...formattedInputProps} />
      </div>
    </div>
  );
}
