"use client";

import { useEffect } from "react";
import { mainNavLinks, loginNavLink, signupNavLink } from "./main-nav-links";
import useNavDir from "@hooks/use-nav-dir";
import MainNavLink from "./MainNavLink";
import styles from "./MainNav.module.scss";

export default function MainNav() {
  const navDir = useNavDir();

  useEffect(() => {
    let elem: HTMLElement | null;
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
          {mainNavLinks.map(linkNode => (
            <li key={linkNode.link.key}>
              <MainNavLink linkNode={linkNode} />
            </li>
          ))}
        </ul>
      </div>
      <div className={styles["nav-section"]}>
        <ul>
          <MainNavLink
            linkNode={loginNavLink}
            className={styles.login}
          />
          <MainNavLink
            linkNode={signupNavLink}
            className={styles.signup}
          />
        </ul>
      </div>
    </nav>
  );
}
