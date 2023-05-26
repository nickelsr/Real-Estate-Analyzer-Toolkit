"use client";

import { useState } from "react";
import FormInput, { FormInputProps } from "./FormInput";
import FormResult, { FormResultProps } from "./FormResult";

export interface FormSubmission {
  maxAllowableOffer: string;
  margin: string;
  repairCost: string;
}

export default function Form() {
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

  const formInputProps: FormInputProps = {
    onSubmitCallback: onSubmit,
  };

  const formResultProps: FormResultProps = {
    maxAllowableOffer,
    repairCost,
    margin,
  };

  return (
    <div>
      <FormInput {...formInputProps} />
      <FormResult {...formResultProps} />
    </div>
  );
}
