"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { CSSTransition } from "react-transition-group";
import Link from "next/link";
import styles from "./Header.module.scss";
import fade from "@animations/fade.module.scss";

export default function Header() {
  const [isVisibleTools, setIsVisibleTools] = useState(false);
  const transitionRef = useRef(null);

  let pathBuilder = "/";
  const paths = [];
  const path = usePathname()
    .split("/")
    .filter(p => p !== "");
  for (let p of path) {
    pathBuilder += p;
    paths.push({ slug: pathBuilder, name: p.replaceAll("-", " ") });
    pathBuilder += "/";
  }

  useEffect(() => {
    let elem;
    if (path.length > 0) {
      elem = document.getElementById(`nav-link-${path[0]}`);
      elem.classList.add(styles["nav-active"]);
    }

    return () => {
      if (elem) elem.classList.remove(styles["nav-active"]);
    };
  }, [path]);

  const toolDropdown = (
    <CSSTransition
      in={isVisibleTools}
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
          <li>
            <Link href="/tools/70-percent-rule">
              <span>70% Rule Calculator</span>
            </Link>
          </li>
        </ul>
      </div>
    </CSSTransition>
  );

  return (
    <>
      <header className={styles.header}>
        <div className={styles["nav-section"]}>
          <ul>
            <li>
              <Link
                className={styles.nav_link}
                id="home-logo"
                href="/"
              >
                <span>Logo Placeholder</span>
              </Link>
            </li>
            <li
              onMouseEnter={() => setIsVisibleTools(true)}
              onMouseLeave={() => setIsVisibleTools(false)}
            >
              <Link
                id="nav-link-tools"
                className={styles.nav_link}
                href="/tools"
              >
                <span>Tools</span>
              </Link>
              {toolDropdown}
            </li>
          </ul>
        </div>
        <div className={styles["nav-section"]}>
          <ul>
            <li>
              <Link
                className={`${styles.nav_link} ${styles.login}`}
                href="/login"
              >
                <span>Login</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${styles.nav_link} ${styles.signup}`}
                href="/sign-up"
              >
                <span>Sign Up</span>
              </Link>
            </li>
          </ul>
        </div>
      </header>
      <div className={styles.current_article}>
        {path && (
          <ul>
            {paths.slice(0, paths.length - 1).map(p => (
              <li
                key={p.slug}
                className={styles.inner_link}
              >
                <Link href={p.slug}>{p.name}</Link>
              </li>
            ))}
            {paths.slice(paths.length - 1, paths.length).map(p => (
              <li key={p.slug}>
                <Link href={p.slug}>{p.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
