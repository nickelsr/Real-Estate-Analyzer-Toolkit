import styles from "./FieldDescription.module.scss";

type FieldDescriptionProps = {
  description: string;
};

export default function FieldDescription({
  description,
}: FieldDescriptionProps) {
  return <p className={styles.description}>{description}</p>;
}
