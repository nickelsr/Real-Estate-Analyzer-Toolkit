"use client";

import { useState, useRef } from "react";
import InputField from "./InputField";
import styles from "./page.module.scss";
import OutputField from "./OutputField";

const ARV = {
  name: "afterRepairValue",
  display: "After Repair Value",
  tooltip: `After Repair Value is the estimated market value of a property
    after planned renovations have been completed.`,
  isCurrency: true,
  required: true,
};
const sqFt = {
  name: "squareFootage",
  display: "Property Size",
  tooltip: "The size of the property in square feet.",
  isMeasurement: true,
  required: true,
};
const CPF = {
  name: "costPerFoot",
  display: "Cost / Square Foot",
  tooltip: `Estimated cost per square foot for renovations. Generally
    between $10-$60 per sq/ft, depending on the scope of the
    renovation, but can be more expensive due to unexpected repairs or
    luxury materials are used.`,
  isCurrency: "$",
  required: true,
};
const EPN = {
  name: "extraProfitNeeded",
  display: "Lender Interest",
  tooltip: `If investment capital is attained through a lender, interest rates
    can eat away at profit margins. Input the total estimated lender interest,
    which will be subtracted from the maximum allowable offer.`,
  isCurrency: "$",
  optional: true,
};
const MAO = {
  name: "maximumAllowableOffer",
  display: "Maximum Allowable Offer",
};
const RENOVATION_COST = {
  name: "renovationCost",
  display: "Renovation Cost",
};
const MARGIN = {
  name: "margin",
  display: "Margin",
};

export default function SeventyPercentRule() {
  const [maxAllowableOffer, setMaxAllowableOffer] = useState("");
  const [margin, setMargin] = useState("");
  const [renovationCost, setRenovationCost] = useState("");
  const resultsRef = useRef();

  function toInt(val) {
    val = val.replaceAll(",", "");
    return +val;
  }

  function handleSubmitForm(event) {
    event.preventDefault();

    const afterRepairValue = toInt(event.target[ARV.name]?.value);
    const extraProfitNeeded = toInt(event.target[EPN.name]?.value);
    const squareFeet = toInt(event.target[sqFt.name]?.value);
    const costPerFoot = toInt(event.target[CPF.name]?.value);

    let renovations = Math.round(squareFeet * costPerFoot);
    let margin = Math.round(0.3 * afterRepairValue);
    let maxAllowableOffer = Math.round(
      0.7 * afterRepairValue - renovations - extraProfitNeeded
    );

    if (maxAllowableOffer < 0) {
      maxAllowableOffer = 0;
      renovations = 0;
      margin = 0;
    }

    setMaxAllowableOffer(Math.round(maxAllowableOffer));
    setRenovationCost(Math.round(renovations));
    setMargin(Math.round(margin));
    resultsRef.current.focus({ focusVisible: true });
  }

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
            <InputField {...ARV} />
            <InputField {...sqFt} />
            <InputField {...CPF} />
            <InputField {...EPN} />
            <button
              className="button"
              type="submit"
            >
              Submit
            </button>
          </div>
          <div
            className={styles.result_container}
            tabIndex="0"
            ref={resultsRef}
          >
            <OutputField
              {...MAO}
              value={maxAllowableOffer}
            />
            <OutputField
              {...RENOVATION_COST}
              value={renovationCost}
            />
            <OutputField
              {...MARGIN}
              value={margin}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
