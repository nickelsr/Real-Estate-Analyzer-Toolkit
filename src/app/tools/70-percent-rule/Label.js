import styles from "./Label.module.css";

export default function Label({ name, display, optional }) {
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
