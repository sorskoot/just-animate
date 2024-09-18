import { readAttribute, writeAttribute } from './attribute.js';
import { readCssVar, writeCssVar } from './cssvar.js';
import { readStyle, writeStyle } from './style.js';
import { readProperty, writeProperty } from './property.js';
import { autoMix } from './mix.js';
export const PROPERTY = 0, CSS_VAR = 1, ATTRIBUTE = 2, STYLE = 3;
const htmlAttributeOnly = ['viewBox'];
const htmlPropOnly = ['innerHTML', 'textContent'];
export function detectTargetType(target, propertyName) {
    const isProbablyHTMLElement = typeof target.tagName === 'string' &&
        target.style;
    if (!isProbablyHTMLElement) {
        return PROPERTY;
    }
    if (propertyName.indexOf('--') === 0) {
        return CSS_VAR;
    }
    if (htmlAttributeOnly.indexOf(propertyName) !== -1) {
        return ATTRIBUTE;
    }
    if (htmlPropOnly.indexOf(propertyName) !== -1) {
        return PROPERTY;
    }
    return STYLE;
}
/**
 * Returns a reader for the given targetType.
 */
export function getReader(targetType) {
    if (targetType === ATTRIBUTE) {
        return readAttribute;
    }
    if (targetType === CSS_VAR) {
        return readCssVar;
    }
    if (targetType === STYLE) {
        return readStyle;
    }
    return readProperty;
}
/**
 * Returns a writer for the given targetType.
 */
export function getWriter(targetType) {
    if (targetType === ATTRIBUTE) {
        return writeAttribute;
    }
    if (targetType === CSS_VAR) {
        return writeCssVar;
    }
    if (targetType === STYLE) {
        return writeStyle;
    }
    return writeProperty;
}
/**
 * Returns a mixers for the given targetType.
 */
export function getMixer(_targetType) {
    return autoMix;
}
//# sourceMappingURL=index.js.map