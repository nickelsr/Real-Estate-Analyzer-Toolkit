/**
 * Checks if value is non-empty and contains only digit characters
 */
export const isInt = (value: string): boolean => {
  return value.length > 0 && !RegExp(/[\D]/, "g").test(value);
};
