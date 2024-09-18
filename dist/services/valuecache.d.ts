import { ja } from '../_types.js';
/**
 * Clear the cache for the target and id.
 * @param id
 * @param target
 */
export declare function clearKeys(id: string, target: ja.AnimationTarget): void;
/**
 * Retrieve value against the id, target, and value.
 * @param id
 * @param target
 * @param key
 */
export declare function retrieveValue(id: string, target: ja.AnimationTarget, key: string): ja.AnimationValue | undefined;
/**
 * Store the value against the id, target, and propname.
 * @param id
 * @param target
 * @param key
 * @param value
 */
export declare function storeValue(id: string, target: ja.AnimationTarget, key: string, value: ja.AnimationValue): void;
