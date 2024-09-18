export function readStyle(target, key) {
    return target.style[key] || getComputedStyle(target)[key];
}
export function writeStyle(target, key, value) {
    target.style[key] = value;
}
//# sourceMappingURL=style.js.map