import Link from "next/link";
import { NavLink } from "./main-nav-links";
import styles from "./Dropdown.module.scss";

interface DropdownProps {
  id: string;
  links: NavLink[];
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
}

export default function Dropdown({ links, id, onClick }: DropdownProps) {
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
