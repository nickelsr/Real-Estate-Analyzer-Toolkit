"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "./MainNav.module.scss";
import useNavDir from "@hooks/use-nav-dir";
import { navLinks } from "@app/config";
import MainNavLink from "./MainNavLink";

export default function MainNav() {
  const navDir = useNavDir();

  useEffect(() => {
    let elem;
    elem = document.getElementById(`nav-link-${navDir}`);
    elem?.classList.add(styles["nav-active"]);

    return () => {
      elem?.classList.remove(styles["nav-active"]);
    };
  }, [navDir]);

  return (
    <nav
      className={styles.nav}
      aria-label="Main Menu"
    >
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
          {navLinks.map(link => (
            <MainNavLink
              key={`nav-link-${link.url}`}
              id={`nav-link-${link.url}`}
              name={link.name}
              url={link.url}
              nestedLinks={link.nestedLinks}
              className={styles.nav_link}
            />
          ))}
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
    </nav>
  );
}
