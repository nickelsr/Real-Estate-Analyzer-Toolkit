"use client";

import { useEffect } from "react";
import { navLinks } from "@app/config";
import useNavDir from "@hooks/use-nav-dir";
import MainNavLink from "./MainNavLink";
import styles from "./MainNav.module.scss";

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
          <MainNavLink
            className={styles.nav_link}
            id="home-logo"
            name="Logo Placeholder"
            url="/"
          />
          {navLinks.map(link => (
            <MainNavLink
              key={`nav-link-${link.url}`}
              id={`nav-link-${link.url}`}
              name={link.name}
              url={link.url}
              nestedLinks={link.nestedLinks}
            />
          ))}
        </ul>
      </div>
      <div className={styles["nav-section"]}>
        <ul>
          <MainNavLink
            className={`${styles.nav_link} ${styles.login}`}
            name="Login"
            url="/login"
          />
          <MainNavLink
            className={`${styles.nav_link} ${styles.signup}`}
            name="Sign Up"
            url="/sign-up"
          />
        </ul>
      </div>
    </nav>
  );
}
