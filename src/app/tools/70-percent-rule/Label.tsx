import styles from "./Label.module.scss";

type LabelProps = {
  name: string;
  display: string;
  optional?: boolean;
};

export default function Label({ name, display, optional }: LabelProps) {
  const classes = `${styles.label} ${optional ? styles.optional : ""}`;

  return (
    <label
      htmlFor={name}
      className={classes}
    >
      {display}
    </label>
  );
}
