import styles from "./Header.module.scss";
import Breadcrumbs from "./Breadcrumbs";
import MainNav from "./MainNav";

export default function Header() {
  return (
    <header className={styles.header}>
      <MainNav />
      <Breadcrumbs />
    </header>
  );
}
