import Input from "./Input";
import Label from "./Label";
import FieldDescription from "./FieldDescription";
import styles from "./InputField.module.scss";

export type InputFieldProps = {
  name: string;
  display: string;
  description: string;
  prefix?: string;
  suffix?: string;
  required?: boolean;
  optional?: boolean;
};

export default function InputField({
  name,
  display,
  description,
  prefix,
  suffix,
  required,
  optional,
}: InputFieldProps) {
  return (
    <div className={styles.container}>
      <div className={styles.row_left}>
        <Label
          name={name}
          display={display}
          optional={optional}
        />
        <Input
          name={name}
          prefix={prefix}
          suffix={suffix}
          required={required}
        />
      </div>
      <div className={styles.row_right}>
        <FieldDescription description={description} />
      </div>
    </div>
  );
}
