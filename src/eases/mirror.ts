import { ja } from '../_types.js';

export function mirror(ease: ja.Ease) {
  return (n: number) => 1 - ease(1 - n);
}
