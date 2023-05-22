"use client";

import { useState } from "react";
import InputField from "./InputField";
import styles from "./page.module.css";
import OutputField from "./OutputField";

const ARV = {
  name: "afterRepairValue",
  display: "After Repair Value",
  tooltip: `After Repair Value is the estimated market value of a property
    after all repairs have been completed.`,
  isCurrency: true,
  required: true,
};
const sqFt = {
  name: "squareFootage",
  display: "Square Footage",
  tooltip: "The Square Footage of the property to repair.",
  isMeasurement: true,
  required: true,
};
const CPF = {
  name: "costPerFoot",
  display: "Cost / Square Foot",
  tooltip: "The estimated Cost Per Square Foot to repair the property.",
  isCurrency: "$",
  required: true,
};
const EPN = {
  name: "extraProfitNeeded",
  display: "Extra Profit Needed",
  tooltip: "The extra profit needed if using a loan.",
  isCurrency: "$",
  required: false,
};
const MAO = {
  name: "maximumAllowableOffer",
  display: "Maximum Allowable Offer",
  required: false,
};
const RENOVATION_COST = {
  name: "renovationCost",
  display: "Total Renovation Cost",
  required: false,
};
const MARGIN = {
  name: "margin",
  display: "Margin",
  required: false,
};

export default function SeventyPercentRule() {
  const [maxAllowableOffer, setMaxAllowableOffer] = useState("");
  const [margin, setMargin] = useState("");
  const [renovationCost, setRenovationCost] = useState("");

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

    let renovations = squareFeet * costPerFoot;
    let margin = 0.3 * afterRepairValue;
    let maxAllowableOffer =
      0.7 * afterRepairValue - renovations - extraProfitNeeded;

    if (maxAllowableOffer < 0) {
      maxAllowableOffer = 0;
      renovations = 0;
      margin = 0;
    }

    setMaxAllowableOffer(Math.round(maxAllowableOffer));
    setRenovationCost(Math.round(renovations));
    setMargin(Math.round(margin));
  }

  return (
    <div className="page-content">
      <h2 className={styles.heading}>70% Rule</h2>
      <form
        onSubmit={handleSubmitForm}
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
        <div>
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
  );
}
