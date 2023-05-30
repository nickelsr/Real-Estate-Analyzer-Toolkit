"use client";

import { useEffect, useRef, useState } from "react";
import InfoIcon from "@public/info-icon.svg";
import styles from "./Popover.module.scss";

interface PopoverProps {
  info: string;
}

export default function Popover({ info }: PopoverProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [isVisible]);

  const handleOnKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === " " || event.key === "Enter") {
      setIsVisible(state => !state);
    }
    if (event.key === "Escape") {
      setIsVisible(false);
    }
  };

  const popover_info = isVisible ? (
    <div className={styles.info_wrapper}>
      <div
        ref={ref}
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
      tabIndex={0}
      className={styles.container}
    >
      <InfoIcon
        onClick={() => setIsVisible(state => !state)}
        onKeyUp={handleOnKeyUp}
        className={styles.icon}
      />
      {popover_info}
    </div>
  );
}
