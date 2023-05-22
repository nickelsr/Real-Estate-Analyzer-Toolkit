import styles from "./FieldDescription.module.scss";

export default function FieldDescription({ description }) {
  return <p className={styles.description}>{description}</p>;
}
