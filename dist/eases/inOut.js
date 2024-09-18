export function inOut(ease, type) {
    if (type === 'out') {
        return (o) => 1 - ease(1 - o);
    }
    if (type === 'in-out') {
        return (o) => o < 0.5 ? ease(o * 2.0) / 2.0 : 1 - ease((1 - o) * 2) / 2;
    }
    return ease;
}
//# sourceMappingURL=inOut.js.map