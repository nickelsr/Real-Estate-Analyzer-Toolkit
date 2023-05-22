/**
 * Split value into two strings. The leading zeros, and the value without leading zeros.
 */
export const splitLeadingZeros = (value: string): Array<string> => {
  let firstNonZeroInd = value.search(/[^0]/);
  if (firstNonZeroInd === -1) firstNonZeroInd = value.length;

  const leadingZeros = value.slice(0, firstNonZeroInd);
  const valueWithoutLeadingZeros = value.slice(firstNonZeroInd);

  return [leadingZeros, valueWithoutLeadingZeros];
};
