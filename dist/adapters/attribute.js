export function readAttribute(target, key) {
    return target.getAttribute(key) || '';
}
export function writeAttribute(target, key, value) {
    target.setAttribute(key, value.toString());
}
//# sourceMappingURL=attribute.js.map