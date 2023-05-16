import Link from "next/link";
import styles from "./Dropdown.module.scss";

export default function Dropdown({ links, id, onClick }) {
  return (
    <div
      id={id}
      className={styles.nav_dropdown}
    >
      <ul>
        {links.map(link => (
          <li key={`nav-link-${link.url}`}>
            <Link
              href={link.url}
              onClick={onClick}
            >
              <span>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
