import { ja } from "../types";
export interface TargetMixer {
    (left: ja.AnimationValue, right: ja.AnimationValue, offset: number): ja.AnimationValue;
}
export interface TargetReader {
    (target: {}, key: string): ja.AnimationValue;
}
export interface TargetWriter {
    (target: {}, key: string, value: ja.AnimationValue): void;
}
export type TargetType = typeof PROPERTY | typeof CSS_VAR | typeof ATTRIBUTE | typeof STYLE;
export declare const PROPERTY = 0, CSS_VAR = 1, ATTRIBUTE = 2, STYLE = 3;
export declare function detectTargetType(target: ja.AnimationTarget, propertyName: string): TargetType;
/**
 * Returns a reader for the given targetType.
 */
export declare function getReader(targetType: TargetType): TargetReader;
/**
 * Returns a writer for the given targetType.
 */
export declare function getWriter(targetType: TargetType): TargetWriter;
/**
 * Returns a mixers for the given targetType.
 */
export declare function getMixer(_targetType: TargetType): TargetMixer;
