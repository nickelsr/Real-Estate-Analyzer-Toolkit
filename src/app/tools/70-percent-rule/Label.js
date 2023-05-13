import { useState } from "react";
import styles from "./Label.module.css";

export default function Label({ name, display, required, tooltip }) {
  const [isVisibleTooltip, setIsVisibleTooltip] = useState(false);

  return (
    <div className={styles.label}>
      {isVisibleTooltip && <div className={styles.popout}>{tooltip}</div>}
      <label
        htmlFor={name}
        className={required ? styles.required : ""}
      >
        {display}
      </label>
      {tooltip && (
        <span
          className={styles.tooltip}
          role="tooltip"
          onMouseEnter={() => setIsVisibleTooltip(true)}
          onMouseLeave={() => setIsVisibleTooltip(false)}
        >
          ?
        </span>
      )}
    </div>
  );
}
