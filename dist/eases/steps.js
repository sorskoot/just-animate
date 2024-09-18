export function steps(count, type) {
    const fn = type === 'end' ? Math.floor : Math.ceil;
    return (x) => {
        const n = fn(x * +count) / +count;
        return n < 0 ? 0 : n > 1 ? 1 : n;
    };
}
//# sourceMappingURL=steps.js.map