"use client";

import { useEffect, useRef, useState } from "react";
import { useClickedOutside, usePressedEscape } from "@hooks";
import InfoIcon from "@public/info-icon.svg";
import styles from "./Popover.module.scss";

interface PopoverProps {
  info: string;
}

export default function Popover({ info }: PopoverProps) {
  const [isVisible, setIsVisible] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const hidePopover = () => {
    setIsVisible(false);
  };

  useClickedOutside(containerRef, hidePopover, isVisible);
  usePressedEscape(hidePopover, isVisible);

  useEffect(() => {
    // show and focus on popover
    if (isVisible) {
      popoverRef.current?.classList.add(styles.visible);
      popoverRef.current?.focus();
    }

    return () => {
      popoverRef.current?.classList.remove(styles.visible);
    };
  }, [isVisible]);

  const handleOnKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === " " || event.key === "Enter") {
      setIsVisible(state => !state);
    }
  };

  const handleOnClick = (event: React.MouseEvent) => {
    setIsVisible(state => !state);
  };

  const popover_info = isVisible ? (
    <div className={styles.info_wrapper}>
      <div
        ref={popoverRef}
        tabIndex={0}
        className={styles.info}
      >
        <p>{info}</p>
      </div>
    </div>
  ) : (
    <></>
  );

  return (
    <div
      className={styles.container}
      ref={containerRef}
    >
      <InfoIcon
        tabIndex={0}
        onClick={handleOnClick}
        onKeyUp={handleOnKeyUp}
        className={styles.icon}
      />
      {popover_info}
    </div>
  );
}
