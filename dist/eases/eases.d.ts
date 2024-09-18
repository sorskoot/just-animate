import { ja } from '../_types.js';
declare const eases: Record<string, ja.EaseFactory>;
declare const cachedGetEases: (str: string) => ja.Ease;
export { eases, cachedGetEases as getEase };
