import { ja } from '../_types.js';
/**
 * This mixer attempts to automatically parse CSS expressions from each value
 * and then create an interpolated value from it.
 * @param valueA The left value to mix.
 * @param valueB The right value to mix.
 * @param offset The progression offset to use.
 */
export declare function autoMix(valueA: ja.AnimationValue, valueB: ja.AnimationValue, offset: number): ja.AnimationValue;
