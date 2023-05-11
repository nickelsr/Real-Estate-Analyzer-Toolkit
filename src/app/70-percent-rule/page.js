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

export default function SeventyPercentRule() {
  const [result, setResult] = useState("");

  function toInt(val) {
    val = val.replaceAll(",", "");
    return +val;
  }

  function handleSubmitForm(event) {
    event.preventDefault();

    const arv = toInt(event.target[ARV.name].value);
    const sqft = toInt(event.target[sqFt.name].value);
    const cpf = toInt(event.target[CPF.name].value);
    const epn = toInt(event.target[EPN.name].value);

    let res = 0.7 * arv - cpf * sqft - epn;
    if (res < 0) {
      res = 0;
    }
    setResult(Math.round(res));
  }

  return (
    <form
      onSubmit={handleSubmitForm}
      className={styles.form}
    >
      <InputField {...ARV} />
      <InputField {...sqFt} />
      <InputField {...CPF} />
      <InputField {...EPN} />
      <OutputField
        {...MAO}
        value={result}
      />
      <button
        className="button"
        type="submit"
      >
        Calculate Maximum Allowable Offer
      </button>
    </form>
  );
}
