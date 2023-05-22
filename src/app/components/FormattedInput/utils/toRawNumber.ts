/**
 * Transforms formatted string value to number.
 */
export const toRawNumber = (value: string): number => {
  const digitsOnlyVal = value.replace(/\D/g, "");
  return +digitsOnlyVal;
};
