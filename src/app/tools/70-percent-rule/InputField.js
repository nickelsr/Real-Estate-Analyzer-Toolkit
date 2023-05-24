import Input from "./Input";
import Label from "./Label";
import FieldDescription from "./FieldDescription";
import styles from "./InputField.module.scss";

export default function InputField({
  name,
  display,
  description,
  prefix,
  suffix,
  required,
  optional,
}) {
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
