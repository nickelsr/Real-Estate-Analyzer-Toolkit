"use client";

import { useEffect, useRef } from "react";
import OutputField, { OutputFieldProps } from "./OutputField";
import styles from "./Result.module.scss";

export interface ResultProps {
  maxAllowableOffer: string;
  repairCost: string;
  margin: string;
}

export default function Result({
  maxAllowableOffer,
  repairCost,
  margin,
}: ResultProps) {
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // focus on results when they are updated
    if (maxAllowableOffer && repairCost && margin && resultsRef.current) {
      resultsRef.current.focus();
    }
  }, [maxAllowableOffer, repairCost, margin]);

  const maxAllowableOfferProps: OutputFieldProps = {
    name: "maximumAllowableOffer",
    display: "Maximum Allowable Offer",
    value: maxAllowableOffer,
  };

  const repairCostProps: OutputFieldProps = {
    name: "repairCost",
    display: "Repairs Cost",
    value: repairCost,
  };

  const marginProps: OutputFieldProps = {
    name: "margin",
    display: "Margin",
    value: margin,
  };

  return (
    <div
      className={styles.result_container}
      tabIndex={0}
      ref={resultsRef}
    >
      <OutputField {...maxAllowableOfferProps} />
      <OutputField {...repairCostProps} />
      <OutputField {...marginProps} />
    </div>
  );
}
