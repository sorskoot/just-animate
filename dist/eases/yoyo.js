export function yoyo(times) {
    times = +(times || times === 0 ? times : 2);
    return (o) => {
        o = o * times;
        const floor = ~~o;
        return floor % 2 ? 1.0 - o + floor : o - floor;
    };
}
//# sourceMappingURL=yoyo.js.map