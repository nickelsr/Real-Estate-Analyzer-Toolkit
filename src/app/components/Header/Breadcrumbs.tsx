"use client";

import useBreadcrumbs from "@hooks/use-breadcrumbs";
import styles from "./Breadcrumbs.module.scss";
import Link from "next/link";

export default function Breadcrumbs() {
  const breadcrumbs = useBreadcrumbs();

  if (breadcrumbs.length === 0) return <></>;

  return (
    <nav
      aria-label="Breadcrumbs"
      className={styles["breadcrumbs"]}
    >
      <ul>
        {breadcrumbs.map(breadcrumb => (
          <li key={`nav-breadcrumbs-${breadcrumb.path}`}>
            <Link href={breadcrumb.path}>{breadcrumb.displayName}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
