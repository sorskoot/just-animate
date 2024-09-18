import { inOut } from './inOut.js';
export function sine(type) {
    return inOut((o) => -Math.cos((o * Math.PI) / 2) + 1, type);
}
//# sourceMappingURL=sine.js.map