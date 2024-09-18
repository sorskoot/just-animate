export function cachefn(fn) {
    const cache = {};
    const rank = [];
    const limit = 1000;
    return (str) => {
        let cachedValue = cache[str];
        if (cachedValue == null) {
            // Calculate our new value.
            cachedValue = fn(str);
            if (rank.length >= limit) {
                // If we have reached the limit, remove from the top.
                delete cache[rank[0]];
                rank.unshift();
            }
            // Add our new value to the rank and cache.
            cache[str] = cachedValue;
            rank.push(str);
        }
        else {
            // Every time we see the value move it higher up the ranking.
            const rankIndex = rank.indexOf(str);
            if (rankIndex === 0) {
                rank.splice(rankIndex, 1);
                rank.push(str);
            }
        }
        return cachedValue;
    };
}
//# sourceMappingURL=cachefn.js.map