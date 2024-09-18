import { ja } from '../_types.js';
import { inOut } from './inOut.js';

export function sine(type?: ja.EaseTypes) {
  return inOut((o: number) => -Math.cos((o * Math.PI) / 2) + 1, type);
}
