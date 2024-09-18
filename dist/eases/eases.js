import { clearContext, PAREN_CLOSE, NUMBER, STRING, FUNCTION, } from '../parsers/common.js';
import { nextToken } from '../parsers/expressions.js';
import { linear } from './linear.js';
import { cachefn } from '../services/cachefn.js';
const eases = {};
const easeCtx = {};
/**
 *
 * @param easeString
 */
function getEase(easeString) {
    clearContext(easeCtx, easeString);
    let token;
    let fn = linear;
    let waitingForTerms = false;
    let fnName;
    const terms = [];
    while (true) {
        token = nextToken(easeCtx);
        if (!token) {
            fn = composeEase(fn, fnName, terms);
            break;
        }
        if (token === PAREN_CLOSE) {
            fn = composeEase(fn, fnName, terms);
            fnName = undefined;
            waitingForTerms = false;
            terms.length = 0;
        }
        else if (waitingForTerms &&
            ((token & NUMBER) !== 0 || (token & STRING) !== 0)) {
            terms.push(easeCtx.match);
        }
        else if (token === STRING) {
            fn = composeEase(fn, easeCtx.match);
        }
        else if (token === FUNCTION) {
            fnName = easeCtx.match;
            waitingForTerms = true;
        }
    }
    return fn;
}
/**
 * Combines the provided function with a new function from the factory.
 * @param fn
 * @param factoryName
 * @param args
 */
function composeEase(fn, factoryName, args) {
    if (!factoryName) {
        return fn;
    }
    const easeFactory = eases[factoryName];
    if (!easeFactory) {
        return fn;
    }
    const outerFn = easeFactory.apply(0, args);
    return (o) => outerFn(fn(o));
}
const cachedGetEases = cachefn(getEase);
export { eases, cachedGetEases as getEase };
//# sourceMappingURL=eases.js.map