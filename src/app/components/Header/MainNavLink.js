import { useRef, useState } from "react";
import Link from "next/link";
import { CSSTransition } from "react-transition-group";
import fade from "@animations/fade.module.scss";
import styles from "./MainNavLink.module.scss";

export default function MainNavLink({ id, url, name, nestedLinks, className }) {
  const [isVisibleDropdown, setIsVisibleDropdown] = useState(false);
  const transitionRef = useRef(null);

  const dropdown = (
    <CSSTransition
      in={isVisibleDropdown}
      nodeRef={transitionRef}
      classNames={{ ...fade }}
      timeout={50}
      mountOnEnter
      unmountOnExit
    >
      <div
        ref={transitionRef}
        className={styles.nav_dropdown}
      >
        <ul>
          {nestedLinks.map(link => (
            <li key={`nav-link-${link.url}`}>
              <Link href={link.url}>
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </CSSTransition>
  );

  const classes = className ? className : "";

  return (
    <li
      onMouseEnter={() => setIsVisibleDropdown(true)}
      onMouseLeave={() => setIsVisibleDropdown(false)}
    >
      <Link
        id={id}
        className={classes}
        href={url}
      >
        <span>{name}</span>
      </Link>
      {dropdown}
    </li>
  );
}
