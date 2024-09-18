/**
 * A helper for numeric sort. The default JavaScript sort is alphanumeric,
 * which would sort 1,9,10 to 1,10,9.
 * @param a the first term to compare.
 * @param b the second term to compare.
 */
export declare function byNumber(a: number, b: number): number;
/**
 * Returns the min if the value is less than, the max if the value is greater
 * than, or the value if in between the min and max.
 * @param value The value to clamp.
 * @param min The minimum value to return.
 * @param max The maximum value to return.
 */
export declare function clamp(value: number, min: number, max: number): number;
/**
 * Finds the index before the provided value in the list of numbers.
 * @param list The list to search.
 * @param value The value to reference.
 */
export declare function findUpperIndex(list: number[], value: number): number;
/**
 * Returns true if the string or nunmber is numeric.
 * @param obj to test for numbers
 */
export declare function isNumeric(obj: number | string): boolean;
/**
 * Coerces a number string into a number;
 * @param str the string to coerce.
 */
export declare function toNumber(str: string): number;
