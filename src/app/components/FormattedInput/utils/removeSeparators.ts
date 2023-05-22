/**
 * Removes all comma separators from a string.
 */
export const removeSeparators = (value: string): string => {
  return value.replace(/,*/g, "");
};
