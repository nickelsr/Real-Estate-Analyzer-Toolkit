"use client";

import { useState } from "react";
import Form, { FormProps } from "./Form";
import Result, { ResultProps } from "./Result";
import styles from "./page.module.scss";

export interface FormSubmission {
  maxAllowableOffer: string;
  margin: string;
  repairCost: string;
}

export default function SeventyPercentRule() {
  const [maxAllowableOffer, setMaxAllowableOffer] = useState("");
  const [margin, setMargin] = useState("");
  const [repairCost, setRepairCost] = useState("");

  const onSubmit = ({
    maxAllowableOffer,
    margin,
    repairCost,
  }: FormSubmission) => {
    setMaxAllowableOffer(maxAllowableOffer);
    setRepairCost(margin);
    setMargin(repairCost);
  };

  const formProps: FormProps = {
    onSubmitCallback: onSubmit,
  };

  const resultProps: ResultProps = {
    maxAllowableOffer,
    repairCost,
    margin,
  };

  return (
    <div className="page-wrapper">
      <div className={styles.page}>
        <h1 className={styles.heading}>70% Rule Calculator</h1>
        <div className={styles.intro_paragraph}>
          <p>
            The 70% Rule is a helpful metric for real estate investors to
            determine the potential profitability of a property. As a general
            guideline, one should avoid investing more than 70% of a property's
            expected after-repair value to purchase and repair the property.
            This leaves the investor with an expected <b>30% margin</b> on the
            after-repair value to account for closing costs, holding costs,
            market fluctuation, and <b>profit</b>.
          </p>
        </div>
        <Form {...formProps} />
        <Result {...resultProps} />
      </div>
    </div>
  );
}
