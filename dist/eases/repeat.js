export function repeat(times) {
    times = +(times || times === 0 ? times : 2);
    return (o) => {
        o = o * times;
        return o === times ? 1 : o - ~~o;
    };
}
//# sourceMappingURL=repeat.js.map