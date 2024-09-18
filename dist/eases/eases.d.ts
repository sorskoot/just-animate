import { ja } from '../types';
declare const eases: Record<string, ja.EaseFactory>;
declare const cachedGetEases: (str: string) => ja.Ease;
export { eases, cachedGetEases as getEase };
