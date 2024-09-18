import { inOut } from './inOut.js';
export function power(type, c) {
    // Ensure it is actually a number.
    c = +(c || c === 0 ? c : 2);
    return inOut((o) => Math.pow(o, c), type);
}
//# sourceMappingURL=power.js.map