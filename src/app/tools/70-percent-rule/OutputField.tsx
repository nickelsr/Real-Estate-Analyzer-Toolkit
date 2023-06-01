import styles from "./OutputField.module.scss";

export type OutputFieldProps = {
  value: string;
  name: string;
  display: string;
};

export default function OutputField({
  value,
  name,
  display,
}: OutputFieldProps) {
  return (
    <div className={styles.output_field}>
      <label
        htmlFor={name}
        className={styles.label}
      >
        {display}
      </label>
      <div className="text-field-wrapper">
        <span className="text-field-prefix">$</span>
        <input
          className="text-field"
          value={value}
          readOnly
        />
      </div>
    </div>
  );
}
