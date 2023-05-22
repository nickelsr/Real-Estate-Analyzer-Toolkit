import { removeSeparators } from "./removeSeparators";
import { splitLeadingZeros } from "./splitLeadingZeros";

/**
 * Adds thousands separators (commas) to a string.
 */
export const toFormattedString = (value: string): string => {
  const [leadingZeros, cleanValue] = splitLeadingZeros(value);

  const unseparatedCleanValue = removeSeparators(cleanValue);
  const splitValue: string[] = unseparatedCleanValue.split("");

  for (let i: number = splitValue.length - 3; i > 0; i -= 3) {
    splitValue.splice(i, 0, ",");
  }

  const separatedValue = splitValue.join("");
  const formattedValue = leadingZeros + separatedValue;

  return formattedValue;
};
