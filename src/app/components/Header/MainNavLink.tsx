import { useState } from "react";
import Link from "next/link";
import Dropdown from "./Dropdown";
import { NavLinkNode } from "./main-nav-links";
import styles from "./MainNavLink.module.scss";

export interface MainNavLinkProps {
  linkNode: NavLinkNode;
  className?: string;
}

const initialDropdownState = { hover: false, focus: false };

export default function MainNavLink({ linkNode, className }: MainNavLinkProps) {
  const {
    link: { name, url, id },
    nestedLinks,
  } = linkNode;

  const [dropdown, setDropdown] = useState(initialDropdownState);

  const handleMouseEnter = () => {
    setDropdown(state => {
      const newState = { ...state };
      newState.hover = true;
      return newState;
    });
  };

  const handleMouseLeave = () => {
    setDropdown(state => {
      const newState = { ...state };
      newState.hover = false;
      return newState;
    });
  };

  const handleFocus = () => {
    setDropdown(state => {
      const newState = { ...state };
      newState.focus = true;
      return newState;
    });
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDropdown(state => {
        const newState = { ...state };
        newState.focus = false;
        return newState;
      });
    }
  };

  const handleClick = () => {
    setDropdown(initialDropdownState);
  };

  const isVisibleDropdown = () => {
    return dropdown.hover || dropdown.focus;
  };

  const dropdownId = `${id}-dropdown`;

  const linkClasses = `${styles.nav_link} ${className ? className : ""}`;

  return (
    <div
      className={styles.link_wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <Link
        id={id}
        className={linkClasses}
        href={url}
        onClick={handleClick}
      >
        <span>{name}</span>
      </Link>
      {nestedLinks && isVisibleDropdown() && (
        <Dropdown
          id={dropdownId}
          links={nestedLinks}
          onClick={handleClick}
        />
      )}
    </div>
  );
}
