/**
 * Removes all leading zeros from a string.
 */
export const removeLeadingZeros = (value: string): string => {
  return value.replace(/^0*/g, "");
};
