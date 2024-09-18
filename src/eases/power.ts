import { inOut } from './inOut.js';
import { ja } from '../_types.js';

export function power(type?: ja.EaseTypes, c?: number) {
  // Ensure it is actually a number.
  c = +(c || c === 0 ? c : 2);
  return inOut((o: number) => Math.pow(o, c!), type);
}
