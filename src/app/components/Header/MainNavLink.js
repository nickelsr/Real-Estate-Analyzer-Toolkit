import Link from "next/link";
import Dropdown from "./Dropdown";
import styles from "./MainNavLink.module.scss";
import { useState } from "react";

const initialState = { hover: false, focus: false };
export default function MainNavLink({ id, url, name, nestedLinks, className }) {
  const [dropdown, setDropdown] = useState(initialState);

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

  const handleBlur = e => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDropdown(state => {
        const newState = { ...state };
        newState.focus = false;
        return newState;
      });
    }
  };

  const handleClick = () => {
    setDropdown(initialState);
  };

  const isVisibleDropdown = () => {
    return dropdown.hover || dropdown.focus;
  };

  const linkClasses = `${styles.nav_link} ${className ? className : ""}`;

  return (
    <li
      className={styles.link_wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <Link
        id={id ? id : ""}
        className={linkClasses}
        href={url}
        onClick={handleClick}
      >
        <span>{name}</span>
      </Link>
      {nestedLinks && isVisibleDropdown() && (
        <Dropdown
          links={nestedLinks}
          onClick={handleClick}
        />
      )}
    </li>
  );
}
