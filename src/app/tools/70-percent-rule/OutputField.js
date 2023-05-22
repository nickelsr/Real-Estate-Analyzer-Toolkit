import Output from "./Output";
import Label from "./Label";
import styles from "./OutputField.module.scss";

export default function OutputField({ value, name, display, required }) {
  return (
    <div className={styles.output_field}>
      <Label
        name={name}
        display={display}
        required={required}
      />
      <Output value={value} />
    </div>
  );
}
