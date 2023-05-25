"use client";

import { useState, useRef } from "react";
import InputField, { InputFieldProps } from "./InputField";
import OutputField, { OutputFieldProps } from "./OutputField";
import { toRawNumber, toFormattedString } from "@components/FormattedInput";
import styles from "./page.module.scss";

export default function SeventyPercentRule() {
  const [maxAllowableOffer, setMaxAllowableOffer] = useState("");
  const [margin, setMargin] = useState("");
  const [renovationCost, setRenovationCost] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);

  function handleSubmitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      afterRepairValue: { value: string };
      squareFootage: { value: string };
      extraProfitNeeded: { value: string };
      costPerFoot: { value: string };
    };

    const afterRepairValue = toRawNumber(target.afterRepairValue.value);
    const extraProfitNeeded = toRawNumber(target.extraProfitNeeded.value);
    const squareFeet = toRawNumber(target.squareFootage.value);
    const costPerFoot = toRawNumber(target.costPerFoot.value);

    let renovations = Math.round(squareFeet * costPerFoot);
    let margin = Math.round(0.3 * afterRepairValue);
    let maxAllowableOffer = Math.round(
      0.7 * afterRepairValue - renovations - extraProfitNeeded
    );

    if (maxAllowableOffer <= 0) {
      maxAllowableOffer = 0;
      renovations = 0;
      margin = 0;
    }

    const formattedMAO = toFormattedString(maxAllowableOffer);
    const formattedRenovationCost = toFormattedString(renovations);
    const formattedMargin = toFormattedString(margin);

    setMaxAllowableOffer(formattedMAO);
    setRenovationCost(formattedRenovationCost);
    setMargin(formattedMargin);

    resultsRef.current?.focus();
  }

  const ARV_InputFieldProps: InputFieldProps = {
    name: "afterRepairValue",
    display: "After Repair Value",
    description: `After Repair Value is the estimated market value of a property
    after planned renovations have been completed.`,
    prefix: "$",
    required: true,
  };

  const SQFT_InputFieldProps: InputFieldProps = {
    name: "squareFootage",
    display: "Property Size",
    description: "The size of the property in square feet.",
    suffix: "sq/ft",
    required: true,
  };

  const CPF_InputFieldProps: InputFieldProps = {
    name: "costPerFoot",
    display: "Cost / Square Foot",
    description: `Estimated cost per square foot for renovations. Generally
    between $10-$60 per sq/ft, depending on the scope of the
    renovation, but can be more expensive due to unexpected repairs or
    luxury materials are used.`,
    prefix: "$",
    required: true,
  };

  const EPN_InputFieldProps: InputFieldProps = {
    name: "extraProfitNeeded",
    display: "Lender Interest",
    description: `If investment capital is attained through a lender, interest rates
    can eat away at profit margins. Input the total estimated lender interest,
    which will be subtracted from the maximum allowable offer.`,
    prefix: "$",
    optional: true,
  };

  const MAO_OutputFieldProps: OutputFieldProps = {
    name: "maximumAllowableOffer",
    display: "Maximum Allowable Offer",
    value: maxAllowableOffer,
  };

  const RC_OutputFieldProps: OutputFieldProps = {
    name: "renovationCost",
    display: "Renovation Cost",
    value: renovationCost,
  };

  const MARGIN_OutputFieldProps: OutputFieldProps = {
    name: "margin",
    display: "Margin",
    value: margin,
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
            expected after-repair value to purchase and renovate the property.
            This leaves the investor with an expected <b>30% margin</b> on the
            after-repair value to account for closing costs, holding costs,
            market fluctuation, and <b>profit</b>.
          </p>
        </div>
        <form
          onSubmit={handleSubmitForm}
          autoComplete="off"
          className={styles.form}
        >
          <div className={styles["field-column"]}>
            <InputField {...ARV_InputFieldProps} />
            <InputField {...SQFT_InputFieldProps} />
            <InputField {...CPF_InputFieldProps} />
            <InputField {...EPN_InputFieldProps} />
            <button
              className="button"
              type="submit"
            >
              Submit
            </button>
          </div>
          <div
            className={styles.result_container}
            tabIndex={0}
            ref={resultsRef}
          >
            <OutputField {...MAO_OutputFieldProps} />
            <OutputField {...RC_OutputFieldProps} />
            <OutputField {...MARGIN_OutputFieldProps} />
          </div>
        </form>
      </div>
    </div>
  );
}
