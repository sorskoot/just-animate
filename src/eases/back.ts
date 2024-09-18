import { ja } from '../_types.js';
import { inOut } from './inOut.js';

const factor = 1.70158;

export function back(type?: ja.EaseTypes) {
  return inOut((n) => n * n * ((factor + 1) * n - factor), type);
}
