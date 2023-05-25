import Output from "./Output";
import Label from "./Label";
import styles from "./OutputField.module.scss";

export type OutputFieldProps = {
  value: string;
  name: string;
  display: string;
  optional?: boolean;
};

export default function OutputField({
  value,
  name,
  display,
  optional,
}: OutputFieldProps) {
  return (
    <div className={styles.output_field}>
      <Label
        name={name}
        display={display}
        optional={optional}
      />
      <Output value={value} />
    </div>
  );
}
