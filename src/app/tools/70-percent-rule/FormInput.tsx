import InputField, { InputFieldProps } from "./InputField";
import { toRawNumber, toFormattedString } from "@components/FormattedInput";
import { FormSubmission } from "./Form";
import styles from "./FormInput.module.scss";

export interface FormInputProps {
  onSubmitCallback: (data: FormSubmission) => void;
}

export default function FormInput({ onSubmitCallback }: FormInputProps) {
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

    let repairs = Math.round(squareFeet * costPerFoot);
    let margin = Math.round(0.3 * afterRepairValue);
    let maxAllowableOffer = Math.round(
      0.7 * afterRepairValue - repairs - extraProfitNeeded
    );

    if (maxAllowableOffer <= 0) {
      maxAllowableOffer = 0;
      repairs = 0;
      margin = 0;
    }

    const formattedMAO = toFormattedString(maxAllowableOffer);
    const formattedRepairCost = toFormattedString(repairs);
    const formattedMargin = toFormattedString(margin);

    const formSubmission: FormSubmission = {
      maxAllowableOffer: formattedMAO,
      repairCost: formattedRepairCost,
      margin: formattedMargin,
    };

    onSubmitCallback(formSubmission);
  }

  const ARV_InputFieldProps: InputFieldProps = {
    name: "afterRepairValue",
    display: "After Repair Value",
    description: `After Repair Value is the estimated market value of a property
    after planned repairs have been completed.`,
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
    description: `Estimated cost per square foot for repairs. Generally
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

  return (
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
    </form>
  );
}
