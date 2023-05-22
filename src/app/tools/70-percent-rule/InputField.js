import FormattedInput from "@components/FormattedInput";
import Label from "./Label";
import FieldDescription from "./FieldDescription";
import styles from "./InputField.module.scss";

export default function InputField({
  name,
  display,
  tooltip,
  isCurrency,
  isMeasurement,
  required,
  optional,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.row_left}>
        <Label
          name={name}
          display={display}
          tooltip={tooltip}
          optional={optional}
        />
        <FormattedInput
          id={name}
          name={name}
          required={required}
        />
      </div>
      <div className={styles.row_right}>
        <FieldDescription description={tooltip} />
      </div>
    </div>
  );
}
