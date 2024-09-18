export function readCssVar(target, key) {
    return target.style.getPropertyValue(key);
}
export function writeCssVar(target, key, value) {
    target.style.setProperty(key, value.toString());
}
//# sourceMappingURL=cssvar.js.map