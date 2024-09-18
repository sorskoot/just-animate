import { ja } from '../_types.js';

export function readProperty(target: HTMLElement, key: string) {
  return target[key];
}
export function writeProperty(
  target: HTMLElement,
  key: string,
  value: ja.AnimationTarget
) {
  target[key] = value;
}
